'use strict';
const starters={web:'org.springframework.boot:spring-boot-starter-web',jpa:'org.springframework.boot:spring-boot-starter-data-jpa',h2:'com.h2database:h2',actuator:'org.springframework.boot:spring-boot-starter-actuator',aop:'org.springframework.boot:spring-boot-starter-aop',test:'org.springframework.boot:spring-boot-starter-test',security:'org.springframework.boot:spring-boot-starter-security',oauth:'org.springframework.boot:spring-boot-starter-oauth2-client',cache:'org.springframework.boot:spring-boot-starter-cache',redis:'org.springframework.boot:spring-boot-starter-data-redis',batch:'org.springframework.boot:spring-boot-starter-batch',retry:'org.springframework.retry:spring-retry',aspects:'org.springframework:spring-aspects',validation:'org.springframework.boot:spring-boot-starter-validation',lombok:'org.projectlombok:lombok',mysql:'com.mysql:mysql-connector-j'};
function pom(number,deps){const compiler=deps.includes('lombok')?'<plugin><groupId>org.apache.maven.plugins</groupId><artifactId>maven-compiler-plugin</artifactId><configuration><annotationProcessorPaths><path><groupId>org.projectlombok</groupId><artifactId>lombok</artifactId><version>${lombok.version}</version></path></annotationProcessorPaths></configuration></plugin>':'';return `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-parent</artifactId><version>3.5.16</version><relativePath/></parent>
  <groupId>com.codesnippet.course</groupId><artifactId>lesson-${String(number).padStart(2,'0')}</artifactId><version>1.0.0</version>
  <properties><java.version>25</java.version></properties>
  <dependencies>
${[...new Set(deps)].map(d=>{const [g,a,v]=starters[d]?starters[d].split(':'):d.split(':');return `    <dependency><groupId>${g}</groupId><artifactId>${a}</artifactId>${v?'<version>'+v+'</version>':''}${d==='test'?'<scope>test</scope>':''}</dependency>`}).join('\n')}
  </dependencies>
  <build><plugins><plugin><groupId>org.springframework.boot</groupId><artifactId>spring-boot-maven-plugin</artifactId></plugin>${compiler}</plugins></build>
</project>
`;}
const packageName=n=>'com.codesnippet.course.lesson'+String(n).padStart(2,'0');
function java(n,path,body){const pkg=packageName(n)+(path.includes('/')?'.'+path.slice(0,path.lastIndexOf('/')).replaceAll('/','.'): '');return {path:'src/main/java/'+pkg.replaceAll('.','/')+'/'+path.split('/').at(-1),text:'package '+pkg+';\n\n'+body.trim()+'\n'};}
function main(n,annotations='',body=''){return java(n,'Application.java',`import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
${annotations.includes('Enable')?'':''}
@SpringBootApplication
${annotations}
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
${body}
}`);}
function lab(n,name,deps,files,cases=[],extra={}){return {number:n,name,directory:'lesson-'+String(n).padStart(2,'0'),files:[{path:'pom.xml',text:pom(n,deps)},...files],cases,...extra};}
function pojo(n,path,fields,annotations='',imports=''){const name=path.split('/').at(-1).replace('.java','');const entries=Object.entries(fields);return java(n,path,`${imports}
${annotations}
public class ${name} {
${entries.map(([f,t])=>`    private ${t} ${f};`).join('\n')}
    public ${name}() {}
    public ${name}(${entries.map(([f,t])=>t+' '+f).join(', ')}) {
${entries.map(([f])=>`        this.${f} = ${f};`).join('\n')}
    }
${entries.map(([f,t])=>{const cap=f[0].toUpperCase()+f.slice(1);return `    public ${t} get${cap}() { return ${f}; }\n    public void set${cap}(${t} ${f}) { this.${f} = ${f}; }`;}).join('\n')}
}`);}
const props=text=>({path:'src/main/resources/application.properties',text:text+'\n'});
module.exports={lab,java,main,pojo,props,packageName};
