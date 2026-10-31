require "json"
require "stringio"
items = JSON.parse(STDIN.read)
checks = 0
items.each do |item|
  mod = Module.new
  mod.module_eval(item.fetch("code"), item.fetch("slug"), 1)
  solver = Object.new.extend(mod)
  item.fetch("tests").each do |args, expected|
    original = JSON.generate(args)
    actual = solver.solve(*args)
    raise "#{item["slug"]}: expected #{expected.inspect}, got #{actual.inspect}" unless actual == expected
    raise "#{item["slug"]}: mutated inputs" unless JSON.generate(args) == original
    checks += 1
  end
  item.fetch("errors").each do |args, expected_class|
    raised = nil
    begin
      solver.solve(*args)
    rescue => error
      raised = error.class.name
    end
    raise "#{item["slug"]}: expected #{expected_class}, got #{raised}" unless raised == expected_class
    checks += 1
  end
  previous = $stdout
  buffer = StringIO.new
  begin
    $stdout = buffer
    Object.new.instance_eval(item.fetch("demo"), item.fetch("slug"), 1)
  ensure
    $stdout = previous
  end
  raise "#{item["slug"]}: displayed output mismatch #{buffer.string.inspect}" unless buffer.string.strip == item.fetch("output")
end
puts "PASS: #{items.length} Ruby solutions, #{checks} behavior/error cases, 60 runnable demo outputs"
