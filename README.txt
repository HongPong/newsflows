NewsFlows
v0.0.0
____________
DESCRIPTION

NewsFlows: a web application designed to collect, parse, display and animate news items and chunks of Internet data attractively.

NewsFlows is designed to use the processing.js platform based on the Processing open programming visualizer language. It is initially designed to work with Drupal 7 ( http://drupal.org ) as a source for cleaning up feeds into a logical enough format. Each news item has a unique node ID (nid) based on their Drupal node IDs. 

It doesn't really need to be on Drupal, if there is some other way to handle the feeds in a cleaned up way.

------------
REQUIREMENTS

- Processing.JS setup correctly
- Some RSS/XML/ATOM feeds to parse in a given format
- Visitors must have HTML5 browsers compliant with CANVAS tag. IE need not apply.

------------
USAGE

Each NewsFlow is based on a Processing sketch given certain startup parameters.

Necessary startup parameters for the sketch include:
- array of URLS 
- (optional) DTD parsing (TODO)

------------
TODO

- Nothing really works yet ;-)
- AJAX callbacks for voting based on Drupal VotingAPI
- API toggle for non-Drupal setups
- Ability to load DTDs for different types of parsing
- Different NewsDroplet content types such as videos


------------
LICENSE

Standard GPL 3.0 license - free as in software!!

------------
CHANGELOG
v.0.0.0 - Initial commit

------------
CREDIT
Concept and implementation by Dan Feidt (hongpong) 
- CONTACT hongpong@hongpong.com - Feidt Design LLC