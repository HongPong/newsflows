// newsflows 0.0.0 Processing.js sketch
//

// Execution flows:
// flow sketch is setup()
// 

// definitions
float frame = 0; // we start at frame 0  
float framerate = 24; // our "sketch" will have a framerate of 24 frames per second.  
NewsFlowSystem nfs;

// variables for our sketch's environment
float gravity = 6; // pixels/sec^2
float width = 800;
float height = 200;
String[] sourcesUrls;
float flowRate;
int itemsLoad = 20; // number to load initially
float terminalVelocity = 30; // max speed pixels/sec
// framerate
XMLElement[] feedItemArray;
InfoDroplet[] activeDroplets; //array holds all living droplets by NID
String sourcesParser; // path to parser URL TODO DTD / DOM
  
void setup() {
  size(800,600);
  //size(width,height);
    background(#CCCCCC);
  frameRate(framerate);
  colorMode(RGB,255,255,255,100);
  stroke(#CCFFBB); // set the default shape outline colour
  fill(#FFFFCC); // set the default shape fill colour 
  //loadSources();
  nfs = new NewsFlowSystem(1,new Vector3D(width/2,height/2,0));
  smooth(); 
}

void draw() {
  background(#CCCCCC);
  frame++; // note that we're one frame further than last time  
  println(frame);  // Printing a String
  nfs.run();
  //nfs.addNewsFlowObject();
  
  // for each activeDroplets[] as x
  // activeDroplets[x].iterateDroplet();
  // end 

}

class NewsDroplet {
//class NewsDroplet extends InfoDroplet {
  // startup vars
  Vector3D loc;  
  Vector3D vel;  
  Vector3D acc; 
  float r;
  float ttl; // waz timer

  NewsDroplet(Vector3D a, Vector3D v, Vector3D l, float r_) {  
    acc = a.copy();  
    vel = v.copy();  
    loc = l.copy();  
    r = r_;  
    ttl = 100.0;  
  }
    // Another constructor (the one we are using here)  takes only location 
  NewsDroplet(Vector3D l) {  
    acc = new Vector3D(0,0.05,0);  
    vel = new Vector3D(random(-1,1),random(-2,0),0);  
    loc = l.copy();  
    r = 10.0;  
    ttl = 100.0;  
  }  
  
  void run() {  
    update();  
    render();  
  }
  
  // Method to update location  
  void update() {  
    vel.add(acc);  
    loc.add(vel);  
    ttl -= 1.0;  
    step++;
  }  
  
  // Method to display  
  void render() {  
    ellipseMode(CENTER);  
    noStroke();  
    fill(255,timer);  
    ellipse(loc.x,loc.y,r,r);  
  }  
  
  
   // Is the newsdroplet still useful?  
  boolean dead() {  
    if (ttl <= 0.0) {  
      return true;  
    } else {  
      return false;  
    }  
  }  
    /*
  void iterateDroplet() {
    step++;
    ttl--;
    if (this.ttl < 1) {
      this.expireDroplet();
  }

  void expireDroplet() {
    // remove droplet from flowsketch's array
  }


  void loadSources() { 
// gets feed items from sourcesUrls;
// for each result
// if feed item does not exist yet:
  // puts feed items into feedItemArray;
// if feed item does exist:
  // update values of same NID on feedItemArray;

  }*/
}
/////////// INTERFACES

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
  int nid; // unique node id
  int step; // droplet frames in ttl
  float ttl; // time to live in frames  
  String style = "default";
  String objectModel = "default"; // for collision settings
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
}
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

class NewsFlowSystem { 
// based on http://processingjs.org/learning/topic/simpleparticlesystem
  ArrayList newsFlowObjects; // arraylist holds all news items
  Vector3D origin; //starting with 1 nozzle
  
  NewsFlowSystem(int num, Vector3D v) {
    newsFlowObjects = new ArrayList();
    origin = v.copy();
    for (int i = 0; i < num; i++) {
      newsFlowObjects.add(new NewsDroplet(origin));
       println(i + "objects NewsFlowSystem");  // Printing a String
      }
    }
  
  void run() {
    // cycle thru array list backwards as we delete um
    println("run NewsFlowSystem");  // Printing a String
    for (int i = newsFlowObjects.size()-1; i >= 0; i--) {
     println("i =" + i);  // Printing a String
      NewsDroplet n = (NewsDroplet) newsFlowObjects.get(i);
      n.run();
      if (n.dead()) {
        newsFlowObjects.remove(n);
        println("removing " + n + "news item");  // Printing a String
      }
    }
  }
  
  void addNewsFlowObject() {
    newsFlowObjects.add(new NewsDroplet(origin));
  }
  
  void addNewsFlowObject(NewsDroplet n) {
    newsFlowObjects.add(n);
  }
   
  // to see if the news objects have any left
  boolean dead() {
    if (newsFlowObjects.isEmpty()) {
      return true;
    } else {
      return false;
    }
  }
}


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