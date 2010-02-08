require "rubygems"
gem "rspec"
gem "selenium-client"
require "selenium/client"
require "selenium/rspec/spec_helper"

describe "JSXGraph Test Box" do
  attr_reader :selenium_driver
  alias :page :selenium_driver

  before(:all) do
    @verification_errors = []
    @selenium_driver = Selenium::Client::Driver.new \
      :host => "localhost",
      :port => 4444,
      :browser => "*chrome",
      :url => "file:///Users/rklancer/dev/smartgraph-demos/slope-prototype/",
      :timeout_in_second => 60
  end

  before(:each) do
    @selenium_driver.start_new_browser_session
  end
  
  append_after(:each) do
    @selenium_driver.close_current_browser_session
    @verification_errors.should == []
  end
  
  it "should move the line after drag" do
    page.open "testable.html"
    page.click_at "css=div#box", "25, 25"
    page.mouse_down_at "css=div#box", "25, 25"
    page.mouse_move_at "css=div#box", "200,200"
    page.capture_entire_page_screenshot Dir.getwd + "/results/after_drag.png", ""

    # the following expression runs ImageMagick's compare command, using "average error" (ae) metric, which prints the
    # number of different pixels between results/after_drag.png and fixtures/after_drag.png to std error (redirected
    # here to stdin so we can read it.

    diff = IO.popen("compare -metric ae results/after_drag.png fixtures/after_drag.png diff.png 2>&1") do |f|
      f.gets.to_i
    end

    diff.should == 0
  end
end
