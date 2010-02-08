require "rubygems"
gem "rspec"
gem "selenium-client"
require "selenium/client"
require "selenium/rspec/spec_helper"

describe "Page: plot_sin.html" do
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
  
  it "should show sine graph when clicked" do
    page.open "plot_sin.html"
    page.click "css=button#plot-button"
    page.capture_entire_page_screenshot "/Users/rklancer/dev/smartgraph-demos/slope-prototype/spec/results/sin_plotted.png", ""
    
    diff = IO.popen("compare -metric ae results/sin_plotted.png fixtures/sin_plotted.png diffs/sin_plotted.png 2>&1") do |f|
      f.gets.rstrip
    end

    diff.should == "0"    
  end
  
  it "should move pointer when dragged" do
    page.open "plot_sin.html"
    page.click "css=button#plot-button"
    page.mouse_down_at "css=div#box", "475,250"
    page.mouse_move_at "css=div#box", "950, 25"
    page.mouse_up "css=div#box"
    page.capture_entire_page_screenshot "/Users/rklancer/dev/smartgraph-demos/slope-prototype/spec/results/sin_plotted_and_dragged.png", ""
  
    diff = IO.popen("compare -metric ae results/sin_plotted_and_dragged.png fixtures/sin_plotted_and_dragged.png diffs/sin_plotted_and_dragged.png 2>&1") do |f|
      f.gets.rstrip
    end

    diff.should == "0"  
  end

  it "should not move pointer when drag target is missed" do
    page.open "plot_sin.html"
    page.click "css=button#plot-button"
    page.mouse_down_at "css=div#box", "485,250"
    page.mouse_move_at "css=div#box", "950, 25"
    page.mouse_up "css=div#box"
    page.capture_entire_page_screenshot "/Users/rklancer/dev/smartgraph-demos/slope-prototype/spec/results/sin_plotted_and_drag_missed.png", ""
 
    # compare sin_plotted_and_drag_missed.png to sin_plotted_and_dragged.png: they should NOT be identical  
    diff = IO.popen("compare -metric ae results/sin_plotted_and_drag_missed.png fixtures/sin_plotted_and_dragged.png diffs/sin_plotted_and_drag_missed.png 2>&1") do |f|
      f.gets.rstrip
    end

    diff.should_not == "0"
  end
end
