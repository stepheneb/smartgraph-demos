#!/usr/bin/env ruby
require 'net/ssh'
require 'yaml'
Net::SSH.start('otto.concord.org', 'sbannasch') do |ssh|
  puts ssh.exec!("cd /web/smartgraph-demos.dev.concord.org; git pull")
end
