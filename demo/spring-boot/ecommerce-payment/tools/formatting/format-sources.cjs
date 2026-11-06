const fs = require('node:fs');
const path = require('node:path');
const beautify = require('js-beautify');
const prettier = require('prettier');

const root = path.resolve(__dirname, '../..');
const originals = path.join(root, 'target/formatting-originals');
const checkOnly = process.argv.includes('--check');
const htmlOptions = {
    indent_size: 4,
    wrap_line_length: 160,
    wrap_attributes: 'auto',
    preserve_newlines: true,
    max_preserve_newlines: 1,
    end_with_newline: true,
    templating: ['erb'],
    inline: ['span', 'em', 'b', 'strong', 'small', 'i', 'c:out', 'c:url', 'c:param'],
    unformatted: [],
    content_unformatted: ['pre', 'textarea', 'script', 'style']
};

function filesAt(directory) {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
        const file = path.join(directory, entry.name);
        return entry.isDirectory() ? filesAt(file) : [file];
    });
}

function formatJsp(text) {
    let current = text;
    for (let pass = 0; pass < 4; pass++) {
        const directives = [];
        const protectedText = current.replace(/<%@[\s\S]*?%>/g, directive => {
            directives.push(directive);
            return `\n<!--__JSP_DIRECTIVE_${directives.length - 1}__-->\n`;
        });
        const formatted = beautify.html(protectedText, htmlOptions)
            .replace(/<!--__JSP_DIRECTIVE_(\d+)__-->/g, (_, index) => directives[Number(index)])
            .replace(/\n[ \t]*\n(?:[ \t]*\n)+/g, '\n\n');
        if (formatted === current) return formatted;
        current = formatted;
    }
    throw new Error('JSP formatting did not stabilize. The source file was not overwritten.');
}

async function main() {
    const views = filesAt(path.join(root, 'src/main/webapp/WEB-INF/views'));
    const assets = ['src/main/webapp/assets/css/store.css', 'src/main/webapp/assets/js/store.js'];
    const illustrations = filesAt(path.join(root, 'src/main/webapp/assets/images'));
    const inputs = [...views, ...assets.map(file => path.join(root, file)), ...illustrations, path.join(root, 'pom.xml')];
    const prettierOptions = await prettier.resolveConfig(path.join(__dirname, '.prettierrc.json'));
    let changed = 0;

    for (const file of inputs) {
        const text = fs.readFileSync(file, 'utf8');
        let formatted;
        if (/\.jspf?$/.test(file)) {
            formatted = formatJsp(text);
        } else {
            formatted = await prettier.format(text, {
                ...prettierOptions,
                filepath: file,
                parser: file.endsWith('.svg') ? 'xml' : undefined,
                plugins: [require.resolve('@prettier/plugin-xml')]
            });
        }
        if (formatted === text) continue;
        changed++;
        if (!checkOnly) {
            const backup = path.join(originals, path.relative(root, file));
            if (!fs.existsSync(backup)) {
                fs.mkdirSync(path.dirname(backup), { recursive: true });
                fs.writeFileSync(backup, text);
            }
            fs.writeFileSync(file, formatted);
        }
    }

    console.log(`${checkOnly ? 'Unformatted' : 'Formatted'} authored web/XML files: ${changed}`);
    if (checkOnly && changed) process.exitCode = 1;
}

main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
});
