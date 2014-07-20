#!/usr/bin/env ruby


output = `grep -r icon-- app/stylesheets/less/blocks/tastyicons.less`

icons = []

output.each_line do |line|
  line.gsub!('.icon--','')
  line.gsub!(/ .+/,'')
  line.gsub!(/\r/,'')
  line.gsub!(/\n/,'')
  icons << "<i icon=\"icon icon--#{line}\"></i><br />"
end

head=<<END
<html>
<head></head>
<body>
<template>
<div id="icons">
END

footer=<<END

</div>
</template>
</body>
</html>
END

content = head + icons.join("\n") + footer

File.write('./app/includes/icons.html', content)
