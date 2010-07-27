#!/usr/bin/env ruby
#
# file gh-pages-prep.rb
#
# Run this after a merge with master to convert links to work in github pages
#
#   http://stepheneb.github.com/smartgraph-demos/index.html
#
#   git co gh-pages
#   git merge -s recursive -X theirs master
#   ruby gh-pages-prep.rb
#   git push origin gh-pages
#

def extract_real_link(file_link)
  cwd = Dir.pwd
  begin
    while File::lstat(file_link).symlink?
      symbolic_link = File::readlink(file_link)
      Dir.chdir(File.dirname(file_link))
      file_link = symbolic_link
    end
  ensure
    Dir.chdir(cwd)
  end
  file_link
end
  
index_html = File.read("index.html")
symbolic_links = Dir["sproutcore/*"].collect { |p| [p, extract_real_link(p).gsub(/^\.\.\//, '')] }
symbolic_links.each { |i| index_html.gsub!("'#{i[0]}'", "'/smartgraph-demos/#{i[1]}'") }
File.open("index.html", 'w') { |f| f.write index_html }

symbolic_links.each do |symbolic_link|
  static_index_file = File.read(symbolic_link[1])
  static_index_file.gsub!(/^\/static/, "/smartgraph-demo/static")
  File.open(symbolic_link[1], 'w') { |f| f.write static_index_file }
end