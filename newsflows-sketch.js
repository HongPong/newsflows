// newsflows 0.0.0 Processing.js sketch
// By Dan Feidt
// LICENSE
// Standard GPL 3.0 license - free as in software!!

// Execution flows:
// flow sketch is setup()
// the NewsFlowSystem is the main particle system which runs over & over

// A lot of this stuff is not implemented - right now it just emits particles

// definitions
float frame = 0; // we start at frame 0  
float framerate = 24; // our "sketch" will have a framerate of 24 frames per second.  
NewsFlowSystem nfs;

// Nozzle locations
leftNozzle = (1,new Vector3D(220, 500,0));
rightNozzle = (1,new Vector3D(750, 200,0));

// file locations not working
String rssiconurl = "/sites/default/files/feed.png";
String drupliconurl = "/misc/druplicon.png";
String newsflowsurl = "/sites/default/files/newsflows-test.png";
PImage img;

// variables for our sketch's environment
float gravity = 6; // pixels/sec^2
float width = 800;
float height = 200;
String[] sourcesUrls; // for feeds
float flowRate;
int itemsLoad = 20; // number to load initially
float terminalVelocity = 30; // max speed pixels/sec
XMLElement[] feedItemArray;
//InfoDroplet[] activeDroplets; //array holds all living droplets by NID
String sourcesParser; // path to parser URL TODO DTD / DOM
  
void setup() {
  size(800,600);
  //size(width,height);
    background(#CCCCCC);
      img = loadImage(newsflowsurl);

  frameRate(framerate);
  colorMode(RGB,255,255,255,100);
  stroke(#CCFFBB); // set the default shape outline colour
  fill(#FFFFCC); // set the default shape fill colour 
  //loadSources();
  
  // this initializes the newsflowsystem with a vector that we need to remove (origin vector)
  nfs = new NewsFlowSystem(1,new Vector3D(width/2,height/2,0)); 
  smooth();  //?
}

// draw is the main loop, it mainly loops the iterator and then fires its own droplet adder.

void draw() {
  background(#111111);
  image(img,10,20); // message about this project
  frame++; // note that we're one frame further than last time  
  //println(frame);  // Printing a String
  nfs.run(); // LOOP the main thing
 //       println("DRAW nfs.run DONE");  
 //      println("DRAW add flow obj");  
  nfs.addNewsDroplet();
  //  println("DRAW nfs.addFlowObject DONE");  
  //  println("--DRAW LOOP DONE--");  
  // for each activeDroplets[] as x
  // activeDroplets[x].iterateDroplet();
  // end 

}

// some nice variables for our droplets including location velocity and acceleration curve
// and also title body source url and background url. and droplet style tells how it will render()
class NewsDroplet {
//class NewsDroplet extends InfoDroplet { // this will be!!
  Vector3D loc;  
  Vector3D vel;  
  Vector3D acc; 
  float r; // radius for ellipses
  float ttl; // waz timer Droplet Time To Live in frames
  int step;
  String title;
  String nid; // unique node id int
  String dropletStyle = "default"; // implemented!
  String dropletObjectModel = "default"; // for collision settings
  String body = "body";
  String author;
  String sourceURL;
  String imageBkgURL;

// alternate constructor not using
/*  NewsDroplet(Vector3D a, Vector3D v, Vector3D newslc, float r_) {  
    acc = a.copy();  
    vel = v.copy();  
    loc = newslc.copy();  
    r = r_;  
    ttl = 100.0;  
  }*/
  
  ///////////////////////
  /// MANY CONSTRUCTORS - the idea here to give us choices on the argument 
  // to make the newsdroplets
  
    // constructor (the one we are using here)  takes only location 
  NewsDroplet(Vector3D newsloc_constr) {  
//                println("-constructor newsdroplet firings" + newsloc_constr);  
    acc = new Vector3D(0,0.05,0);  
    vel = new Vector3D(random(-1,1),random(-2,0),0);  
    loc = newsloc_constr.copy();
    r = 10.0;  
    ttl = 100.0;  // lives for 100 frames
  //println("constr newsdropplet done");  
  }  

     // Another constructor handles stylepicker
    NewsDroplet(Vector3D newsloc_constr, String dropStyle) {  
//println("-constructor newsdroplet firings" + newsloc_constr);  
    acc = new Vector3D(0,0.05,0);  // gravity vector float .05
    dropletStyle = dropStyle; 
    vel = new Vector3D(random(-1,1),random(-2,0),0);  // the spew randomer
    loc = newsloc_constr.copy();  // grabs origin loc
    r = 10.0;  
    ttl = 100.0;  
  //                println("constr newsdropplet done");  
  }  
  
      // Another constructor with body field
    NewsDroplet(Vector3D newsloc_constr, String dropStyle, String body) {  
//                println("-constructor newsdroplet firings" + newsloc_constr);  
    acc = new Vector3D(0,0.05,0);  
    dropletStyle = dropStyle;
    vel = new Vector3D(random(-1,1),random(-2,0),0);  
    loc = newsloc_constr.copy();  
    r = 10.0;  
    ttl = 100.0;  
  //                println("constr newsdropplet done");  
  }  

  // each newsdroplet has to run
  void run() {  
   // println("n.run");  // Printing a String
  //  println("n.update"); 
  // the update is the physical nudge
    update();  
  //  println("update done // n.render");
  // the render is picked by style
    render();  
  //  println("n.render done // done running"); 
  }
  
  // Method to update location  
  void update() {  
    vel.add(acc);  
    loc.add(vel);  
    ttl -= 1.0;   // nick a ttl
    step++;
  }  
  
  // RENDER STYLES Method to display  - switch by style
  void render() {  
  PImage b; // not work
    switch(this.dropletStyle) // we can has style switches
    {
    case "default" :
      ellipseMode(CENTER);  
      noStroke();  
      fill(0,242,0,ttl*2);   // the color with escalating alpha channel
      rect(loc.x,loc.y,40,6);
      //      b = loadImage("/sites/default/files/feed.png",16,16); // can't get these to work
     //   image(b,loc.x,loc.y);
    break;
    case "illuminati" :
      // lol need the EYE of HORUS
    break;
    case "rss" :
//      b = loadImage("/sites/default/files/feed.png",16,16); // can't get these to work
//      image(b, loc.x, loc.y);
      fill(255,242,0,ttl*3);  
       rect(loc.x,loc.y,45,10); 
    break;
    case "circles" : // white circles
      ellipseMode(CENTER);  
      noStroke();  
      fill(255,ttl);  
      ellipse(loc.x,loc.y,r,r);
    break;
    }
  }  
  
   // Is the newsdroplet still useful?  
  boolean dead() {  
    if (ttl <= 0.0) {  
      return true;  
    } else {  
      return false;  
    }  
  }
}

// the one and only newsflowsystem particle machine run every frame!
// newsFlowObjects[] is an arraylist() with each droplet 
// RUN, addNewsDroplet, dead
class NewsFlowSystem { 
// based on http://processingjs.org/learning/topic/simpleparticlesystem
  ArrayList newsFlowObjects; // arraylist holds all news items
  Vector3D origin; //starting with 1 nozzle center
  //Vector3D leftNozzle;
  //Vector3D rightNozzle;
  
  NewsFlowSystem(int num, Vector3D v) {
    newsFlowObjects = new ArrayList();
    origin = v.copy();

// this loop only goes at the beginning (the kicker?)
    for (int i = 0; i < num; i++) {
      newsFlowObjects.add(new NewsDroplet(origin));
  //     println(i + "droplet at origin"); 
      newsFlowObjects.add(new NewsDroplet(leftNozzle, "rss"));
 //println(i + "droplet at leftnozzle"); 

      newsFlowObjects.add(new NewsDroplet(rightNozzle, "circles"));
 //println(i + "droplet at rightnozzle"); 
  //     println(i + "startup objects loop DONE NewsFlowSystem");  
      }
    }

  // LOOP this is the master main loop of the newsflowsystem particle sustem
  void run() {
    // cycle thru array list backwards as we delete um
 //   println("run NewsFlowSystem loop" + frame);  // Printing a String
    for (int i = newsFlowObjects.size()-1; i >= 0; i--) {
    //println("i =" + i);  // Printing a String
      NewsDroplet n = (NewsDroplet) newsFlowObjects.get(i);
      n.run(); // makes this NewsDroplet Run
      //println("nfs.run returned"); 
      if (n.dead()) { // is droplet expired?
        //println("n.dead removing " + n + "news item");  // Printing a String
        newsFlowObjects.remove(i);
      }
      //println("newsflowsystem run DONE sucka");
    }
  }
  
  /// currently adding three at once
  void addNewsDroplet() {
    //println("--addNewsDroplet() starts");  
    newsFlowObjects.add(new NewsDroplet(origin, "default"));
    //println("--add new NewsDroplet(origin) ok"); 
        newsFlowObjects.add(new NewsDroplet(leftNozzle, "rss"));
    //println("--add new NewsDroplet(leftNozzle) ok"); 
      newsFlowObjects.add(new NewsDroplet(rightNozzle, "circles"));
   // println("--add new NewsDroplet(rightNozzle) ok"); 
  }
  //void addNewsFlowObject(nozzle) {
  //  newsFlowObjects.add(new NewsDroplet(nozzle));
  //}
  //void addNewsFlowObject(NewsDroplet n) {
  //  newsFlowObjects.add(n);
  //}
   
  // to see if the news objects have any left, otherwise our particle system is .dead True
  boolean dead() {
    if (newsFlowObjects.isEmpty()) {
      return true;
    } else {
      return false;
    }
  }
}


////////////
// Simple Vector3D Class   
// via http://processingjs.org/learning/topic/simpleparticlesystem  

public class Vector3D {  
  public float x;  
  public float y;  
  public float z;  
  
  Vector3D(float x_, float y_, float z_) {  
    x = x_; y = y_; z = z_;  
  }  
  
  Vector3D(float x_, float y_) {  
    x = x_; y = y_; z = 0f;  
  }  
    
  Vector3D() {  
    x = 0f; y = 0f; z = 0f;  
  }  
  
  void setX(float x_) {  
    x = x_;  
  }  
  
  void setY(float y_) {  
    y = y_;  
  }  
  
  void setZ(float z_) {  
    z = z_;  
  }  
    
  void setXY(float x_, float y_) {  
    x = x_;  
    y = y_;  
  }  
    
  void setXYZ(float x_, float y_, float z_) {  
    x = x_;  
    y = y_;  
    z = z_;  
  }  
  
  void setXYZ(Vector3D v) {  
    x = v.x;  
    y = v.y;  
    z = v.z;  
  }  
  public float magnitude() {  
    return (float) Math.sqrt(x*x + y*y + z*z);  
  }  
  
  public Vector3D copy() {  
    return new Vector3D(x,y,z);  
  }  
  
  public Vector3D copy(Vector3D v) {  
    return new Vector3D(v.x, v.y,v.z);  
  }  
    
  public void add(Vector3D v) {  
    x += v.x;  
    y += v.y;  
    z += v.z;  
  }  
  
  public void sub(Vector3D v) {  
    x -= v.x;  
    y -= v.y;  
    z -= v.z;  
  }  
  
  public void mult(float n) {  
    x *= n;  
    y *= n;  
    z *= n;  
  }  
  
  public void div(float n) {  
    x /= n;  
    y /= n;  
    z /= n;  
  }  
  
  public void normalize() {  
    float m = magnitude();  
    if (m > 0) {  
       div(m);  
    }  
  }  
  
  public void limit(float max) {  
    if (magnitude() > max) {  
      normalize();  
      mult(max);  
    }  
  }  
  
  public float heading2D() {  
    float angle = (float) Math.atan2(-y, x);  
    return -1*angle;  
  }  
  
  public Vector3D add(Vector3D v1, Vector3D v2) {  
    Vector3D v = new Vector3D(v1.x + v2.x,v1.y + v2.y, v1.z + v2.z);  
    return v;  
  }  
  
  public Vector3D sub(Vector3D v1, Vector3D v2) {  
    Vector3D v = new Vector3D(v1.x - v2.x,v1.y - v2.y,v1.z - v2.z);  
    return v;  
  }  
  
  public Vector3D div(Vector3D v1, float n) {  
    Vector3D v = new Vector3D(v1.x/n,v1.y/n,v1.z/n);  
    return v;  
  }  
  
  public Vector3D mult(Vector3D v1, float n) {  
    Vector3D v = new Vector3D(v1.x*n,v1.y*n,v1.z*n);  
    return v;  
  }  
  
  public float distance (Vector3D v1, Vector3D v2) {  
    float dx = v1.x - v2.x;  
    float dy = v1.y - v2.y;  
    float dz = v1.z - v2.z;  
    return (float) Math.sqrt(dx*dx + dy*dy + dz*dz);  
  }  
  
}  



    /*
  void loadSources() { 
// gets feed items from sourcesUrls;
// for each result
// if feed item does not exist yet:
  // puts feed items into feedItemArray;
// if feed item does exist:
  // update values of same NID on feedItemArray;

  }*/
  
////////
/*
interface Physics   // via http://processingjs.org/reference/articles/PomaxGuide
    {  
      // collision modifies the two force vectors in place. Nothing is returned.  
      void collide_objects(float[] forcevector1, float[] forcevector2, float collisionangle);  
      // get force vector returns a force vector  
      float[] get_force_vector(float[] startpoint, float[] distancevector, float acceleration);  
      // trajectory calculation returns a curve, represented as a lest of 2D coordinates  
      float[][] get_trajectory(float[] startpoint, float objectmass, float[] initialvector, float[] gravityvector, float gravitystrength);
    }  
*/
//////////// IMPLEMENTATIONS!
/*
class InfoNozzle extends Nozzle
{
  InfoNozzle() {
    //constructor
  }
}
 
  void run() {  
    update();  
    render();  
  }  

///////////// HANDLERS
void mousePressed() {

}
void mouseReleased() {

}
*/


/////////// INTERFACES
/*
interface InfoDroplet {
  //void iterateDroplet();
  //void changeWeight(int weight); // TODO for incoming vote results
  boolean dead();
  void render();
  void update();
  void run();
  
  // infodroplet vars
  float timestamp_created;
  String title;
  String nid; // unique node id
  int step; // droplet frames in ttl
  float ttl; // time to live in frames  
  String dropletStyle = "default";
  String dropletObjectModel = "default"; // for collision settings
  String body = "body";
  String author;
  String sourceURL;
  //Object imagefield;
  //int voteUp; // value of upvote
  //int voteDown;
  Vector3D loc;  
  Vector3D vel;  
  Vector3D acc; 
  float weight;
  float width = 200;
  float height = 75;
  //String[] tags;
}*/
/*
interface Nozzle {
  void iterateNozzle();
  void createDroplet();
  void onNozzle();
  void offNozzle();
  void emptyNozzle(); // fires when array = 0
  int nozzleID;
  int xPos;
  int yPos;
  int zPos;
  String flowModel = "default"; // constant, random, density more=faster, off, spew left,
  // could include initial velocity values
  float flowRate;
  float flowRate_Random;
  XMLElement[] feedItemArray;
  String backgroundImage; //path
}*/
