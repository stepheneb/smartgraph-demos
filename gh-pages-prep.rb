#!/usr/bin/env ruby
#
# file gh-pages-prep.rb
#
# Run this after a merge with master to convert links to work in github pages
#
#   http://stepheneb.github.com/smartgraph-demos/index.html
#
#   git checkout master
#   git pull
#   git checkout gh-pages
#   git merge -s recursive -X theirs master
#   ruby gh-pages-prep.rb
#   git commit -am 'gh-pages: re-write paths in static content files'
#   git push origin gh-pages
#

# follow symbolic links and return real file
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

FIND_PATH = /'\/static\//
REPLACE_PATH = "'/smartgraph-demos/static/"
def replace_paths(path_to_file)
  content = File.read(path_to_file)
  File.open(path_to_file, 'w') do |f|
    f.write content.gsub(FIND_PATH, REPLACE_PATH)
  end
end

# replace hrefs to symbolic links in index.htrml
# with paths to real files
index_html = File.read("index.html")
symbolic_links = Dir["sproutcore/*"].collect { |p| [p, extract_real_link(p).gsub(/^\.\.\//, '')] }
symbolic_links.each { |i| index_html.gsub!("'#{i[0]}'", "'/smartgraph-demos/#{i[1]}'") }
File.open("index.html", 'w') { |f| f.write index_html }

# update paths in all files that might have links to static resources
Dir["static/**/*.{css,html,js}"].each { |content_path| replace_paths(content_path) }
