---
layout: page
title : Home
---
<style>
a.paper:link, a.paper:visited {
  background-color: #E95D16;
  color: white;
  padding: 5px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}

a.paper:hover, a.paper:active {
  background-color: red;
}
a.links:link, a.links:visited {
  background-color: none;
  color: blue;
  border-style: solid;
  border-width: thin;
  border-color: blue;
  padding: 3px 3px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}

a.links:hover, a.links:active {
  background-color: blue;
  color: white;
  border-style: solid;
  border-color: black;
}

/*Block Quote CSS Styles below*/
@import url(https://fonts.googleapis.com/css?family=EB+Garamond|Droid+Serif|Playfair+Display|Open+Sans+Condensed:300);

*, *:after, *:before {
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;
}

p {
    line-height: 1.4em;
}

.quote {
    position: relative;
    letter-spacing: .03em;
    margin-bottom: .5rem;
    
    &:before {
        content: "“";
        position: absolute;
        left: -.7em;
    }
    
    &:after {
        content: "”";
        margin-right: -1rem;
    }
}

.quote--container {
    margin: 4.5rem auto 0;
    width: 50%;
    /*border-bottom: 2px dotted #C6D1BF;*/
    padding-bottom: .5rem;
}

.quote--highlight {
    color: #D24335;
}

.quote--author {
    font-family: 'Open Sans Condensed';
    font-size: .8rem;
    text-align: right;
    font-weight: 300;
}


</style>

Hi, I'm a Research Scholar at <a href="http://www.nec-labs.com">NEC Labs</a>, <a href="http://www.nec-labs.com/research-departments/media-analytics/media-analytics-home">Media Analytics</a> department working with <a href="https://cseweb.ucsd.edu/~mkchandraker/">Prof. Manmohan Chandraker</a>. My research interests span areas of vision, learning, and robotics. At NEC, I have worked on problems related to diverse simulation and prediction of trajectories for autonomous vehicles. My current direction focusses on problems (ex. Rearrangement, Social Navigation) in the domain of Embodied AI. My long term goal is build systems that can safely navigate and work alongside humans in doing day to day tasks. 
<br/>
<br/>
Prior to joining NEC, I worked as a Research Assistant at <a href="https://robotics.iiit.ac.in/">Robotics Research Center</a> with <a href="https://www.iiit.ac.in/people/faculty/mkrishna/">Prof. K. Madhava Krishna</a> and <a href="https://faculty.iiit.ac.in/~vgandhi/">Prof. Vineet Gandhi</a> in problems related to perception and prediction for autonomous vehicles. I spent my Summer 2017 at <a href="https://www.iiitd.ac.in">IIIT Delhi</a>, working with <a href="https://sites.google.com/view/sanjitkkaul/">Dr. Sanjit Kaul</a> gaining a good hands on experience in building a self-driving vehicle prototype.

<div class="quote--container">
    <p class="quote">
        Never give up on a dream just because of the time it will take to accomplish it. The time will pass anyway.
    </p>
    <p class="quote--author">&ndash; Earl Nightingale</p>
</div>

<hr/>
<font size="4">
<div align="center"><b>News</b></div>
</font>

<img src="/images/new.jpeg" algin="left" width="45" /> **02/21:** Paper *Divide and Conquer for Lane-Aware Diverse Trajectory Prediction* is accepted to CVPR 2021 (Oral). <br/>
**00/21:** Reviewer for CVPR 2021, IROS 2021 and ICCV 2021.<br/>
**07/20:** Paper *SMART: Simultaneous Multi-Agent Recurrent Trajectory Prediction* is accepted to ECCV 2020. <br />
**11/19:** Served as a reviewer for ICRA 2020. <br/>
**07/19:** Joined NEC Labs America as a Research Scholar. <br/>
**06/19:** Paper *Talk to the Vehicle: Language Conditioned Autonomous Navigation of Self Driving Cars* is accepted at IROS 2019. <br/>
**04/19:** Paper *A Hierarchical Network for Diverse Trajectory Proposals* is accepted at IV 2019. <br/>
**04/19:** Work on shrinking domain based control for planning is accepted at AIR 2019. <br/>

<hr/>
<font size="4">
<div align="center"><b>Publications</b></div> <br/>
</font>

<table style="background-color:#F1F7FC">
  <tr>
    <td style="text-align:left;vertical-align:top;padding-top:1%;padding-left:1%;" width="25%">    <img src="/images/publications/DAC_cvpr21.png" align="left" width="250" />    </td>
    <td width="70%">    <a href="https://arxiv.org/abs/2104.08277"> 
      <strong> Divide-and-Conquer for Lane-Aware Diverse Trajectory Prediction</strong> </a> <br/> 
      <strong>Sriram Narayanan</strong>, Ramin Moslemi, Francesco Pittaluga, Buyu Liu, Manmohan Chandraker<br/>
      <span style="color: green">Computer Vision and Pattern Recognition (CVPR), 2021 </span> <strong><span style="color: red">(Oral)</span></strong><br/>
      <a class="links" href="https://arxiv.org/abs/2104.08277"> Paper </a>&nbsp; 
      <div class="readmore">
        <p align='justify'>Trajectory prediction is a safety-critical tool for autonomous vehicles to plan and execute actions. Our work addresses two key challenges in trajectory prediction, learning multimodal outputs, and better predictions by imposing constraints using driving knowledge. Recent methods have achieved strong performances using Multi-Choice Learning objectives like winner-takes-all (WTA) or best-of-many. But the impact of those methods in learning diverse hypotheses is under-studied as such objectives highly depend on their initialization for diversity. As our first contribution, we propose a novel Divide-And-Conquer (DAC) approach that acts as a better initialization technique to WTA objective, resulting in diverse outputs without any spurious modes. Our second contribution is a novel trajectory prediction framework called ALAN that uses existing lane centerlines as anchors to provide trajectories constrained to the input lanes. Our framework provides multi-agent trajectory outputs in a forward pass by capturing interactions through hypercolumn descriptors and incorporating scene information in the form of rasterized images and per-agent lane anchors. Experiments on synthetic and real data show that the proposed DAC captures the data distribution better compare to other WTA family of objectives. Further, we show that our ALAN approach provides on par or better performance with SOTA methods evaluated on Nuscenes urban driving benchmark.</p>
        <span class="readmore-link"></span>
      </div>
    </td> 
  </tr>
</table>

<table style="background-color:#F1F7FC">
  <tr>
    <td style="text-align:left;vertical-align:top;padding-top:1%;padding-left:1%;" width="25%">    <img src="/images/publications/eccv20.gif" align="left" width="250" />    </td>
    <td width="70%">    <a href="https://arxiv.org/pdf/2007.13078.pdf"> 
      <strong> SMART: Simultaneous Multi-Agent Recurrent Trajectory Prediction</strong> </a> <br/> 
      <strong>Sriram N N</strong>, Buyu Liu, Francesco Pittaluga, Manmohan Chandraker<br/>
      <span style="color: green">European Conference on Computer Vision (ECCV), 2020 </span><br/>
      <a class="links" href="https://arxiv.org/pdf/2007.13078.pdf"> Paper </a>
      <a class="links" href="https://youtu.be/puBAVMoLgQU"> Video </a>
      <a class="links" href="http://www.nec-labs.com/uploads/Documents/Media-Analytics/research-videos/SMART-%20Simultaneous%20Multi-Agent%20Recurrent%20Trajectory%20Prediction.mp4"> Short Talk </a>&nbsp; 
      <div class="readmore">
        <p align='justify'>We propose advances that address two key challenges in future trajectory prediction: (i) multimodality in both training data and predictions and (ii) constant time inference regardless of number of agents. Existing trajectory predictions are fundamentally limited by lack of diversity in training data, which is difficult to acquire with sufficient coverage of possible modes. Our first contribution is an automatic method to simulate diverse trajectories in the top-view. It uses pre-existing datasets and maps as initialization, mines existing trajectories to represent realistic driving behaviors and uses a multi-agent vehicle dynamics simulator to generate diverse new trajectories that cover various modes and are consistent with scene layout constraints. Our second contribution is a novel method that generates diverse predictions while accounting for scene semantics and multi-agent interactions, with constant-time inference independent of the number of agents. We propose a convLSTM with novel state pooling operations and losses to predict scene-consistent states of multiple agents in a single forward pass, along with a CVAE for diversity. We validate our proposed multi-agent trajectory prediction approach by training and testing on the proposed simulated dataset and existing real datasets of traffic scenes. In both cases, our approach outperforms SOTA methods by a large margin, highlighting the benefits of both our diverse dataset simulation and constant-time diverse trajectory prediction methods.</p>
        <span class="readmore-link"></span>
      </div>
    </td> 
  </tr>
</table>

<table style="background-color:#F1F7FC">
  <tr>
    <td style="text-align:left;vertical-align:top;padding-top:1%;padding-left:1%;" width="25%">    <img src="/images/publications/iros19.gif" align="left" width="250" />    </td>
    <td width="70%">    <a href="https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=8967929"> 
    <strong> Talk to the Vehicle: Language Conditioned Autonomous Navigation of Self Driving Cars</strong> </a> <br/> 
     <strong>Sriram N N</strong>*, Tirth Maniar*, Jayaganesh Kalyanasundaram, Vineet Gandhi, Brojeshwar Bhowmick, K Madhava Krishna<br/>
     <span style="color: green">International Conference on Intelligent Robots and Systems (IROS), 2019</span><br/>
    <a class="links" href="https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=8967929"> Paper </a>
    <a class="links" href="https://www.youtube.com/watch?v=zx8s2l2tcAU"> Video </a>&nbsp; 
    <div class="readmore">
        <p align='justify'>We propose a novel pipeline that blends encodings from natural language and 3D semantic maps obtained from visual imagery to generate local trajectories that are executed by a low-level controller. The pipeline precludes the need for a prior registered map through a local waypoint generator neural network. The waypoint generator network (WGN) maps semantics and natural language encodings (NLE) to local waypoints. A local planner then generates a trajectory from the ego location of the vehicle (an outdoor car in this case) to these locally generated waypoints while a low-level controller executes these plans faithfully. The efficacy of the pipeline is verified in the CARLA simulator environment as well as on local semantic maps built from real-world KITTI dataset. In both these environments (simulated and real-world) we show the ability of the WGN to generate waypoints accurately by mapping NLE of varying sequence lengths and levels of complexity. We compare with baseline approaches and show significant performance gain over them. And finally, we show real implementations on our electric car verifying that the pipeline lends itself to practical and tangible realizations in uncontrolled outdoor settings. In loop execution of the proposed pipeline that involves repetitive invocations of the network is critical for any such language-based navigation framework. This effort successfully accomplishes this thereby bypassing the need for prior metric maps or strategies for metric level localization during traversal.</p>
        <span class="readmore-link"></span>
      </div>
    </td> 
  </tr>
</table>

<table style="background-color:#F1F7FC">
  <tr>
    <td style="text-align:left;vertical-align:top;padding-top:1%;padding-left:1%;" width="25%">    <img src="/images/publications/iv19.gif" align="left" width="250"/>    </td>
    <td width="70%">    <a href="https://ieeexplore.ieee.org/abstract/document/8813986"> 
    <strong> A Hierarchical Network for Diverse Trajectory Proposals </strong> </a> <br/> 
    <strong>Sriram N N</strong>, Gourav Kumar, Abhay Singh, M. Siva Karthik, Saket Saurav, Brojeshwar Bhowmick, K. Madhava Krishna<br/> 
    <span style="color: green">Intelligent Vehicles Symposium (IV), 2019</span> <br/>
    <a class="links" href="https://ieeexplore.ieee.org/abstract/document/8813986"> Paper </a> 
    <a class="links" href="https://www.youtube.com/watch?v=cvq2dFS-dZo"> Video </a> &nbsp; 
    <div class="readmore">
        <p align='justify'>Autonomous explorative robots frequently encounter scenarios where multiple future trajectories can be pursued. Often these are cases with multiple paths around an obstacle or trajectory options towards various frontiers. Humans in such situations can inherently perceive and reason about the surrounding environment to identify several possibilities of either manoeuvring around the obstacles or moving towards various frontiers. In this work, we propose a 2 stage Convolutional Neural Network architecture which mimics such an ability to map the perceived surroundings to multiple trajectories that a robot can choose to traverse. The first stage is a Trajectory Proposal Network which suggests diverse regions in the environment which can be occupied in the future. The second stage is a Trajectory Sampling network which provides a finegrained trajectory over the regions proposed by Trajectory Proposal Network. We evaluate our framework in diverse and complicated real life settings. For the outdoor case, we use the KITTI dataset and our own outdoor driving dataset. In the indoor setting, we use an autonomous drone to navigate various scenarios and also a ground robot which can explore the environment using the trajectories proposed by our framework. Our experiments suggest that the framework is able to develop a semantic understanding of the obstacles, open regions and identify diverse trajectories that a robot can traverse. Our comparisons portray the performance gain of the proposed architecture over a diverse set of methods against which it is compared.</p>
        <span class="readmore-link"></span>
      </div>
    </td> 
  </tr>
</table>

<table style="background-color:#F1F7FC">
  <tr>
    <td style="text-align:left;vertical-align:top;padding-top:1%;padding-left:1%;" width="25%">   <img src="/images/publications/air19.gif" align="left" width="250"/>    </td>
    <td width="70%">    <a href="https://arxiv.org/pdf/1804.08679.pdf"> 
    <strong> Gradient Aware - Shrinking Domain based Control Design for Reactive Planning Frameworks used in Autonomous Vehicles </strong> </a> <br/> 
     Adarsh Modh, Siddharth Singh, A. V. S. Sai Bhargav Kumar, <strong>Sriram N N</strong>, K. Madhava Krishna<br/> 
    <span style="color: green">Proceedings of the Advances in Robotics (AIR), 2019</span> <br/>
    <a class="links" href="https://arxiv.org/pdf/1804.08679.pdf"> Paper </a> <a class="links" href="https://www.youtube.com/watch?v=Yf4F0dvkwQE"> Video </a> &nbsp; 
    <div class="readmore">
        <p align='justify'>In this paper, we present a novel control law for longitudinal speed control of autonomous vehicles. The key contributions of the proposed work include the design of a control law that reactively integrates the longitudinal surface gradient of road into its operation. In contrast to the existing works, we found that integrating the path gradient into the control framework improves the speed tracking efficacy. Since the control law is implemented over a shrinking domain scheme, it minimizes the integrated error by recomputing the control inputs at every discretized step and consequently provides less reaction time. This makes our control law suitable for motion planning frameworks that are operating at high frequencies. Furthermore, our work is implemented using a generalized vehicle model and can be easily extended to other classes of vehicles. The performance of gradient aware-shrinking domain based controller is implemented and tested on a stock electric vehicle on which a number of sensors are mounted. Results from the tests show the robustness of our control law for speed tracking on a terrain with varying gradient while also considering stringent time constraints imposed by the planning framework. </p>
        <span class="readmore-link"></span>
      </div>
    </td> 
  </tr>
</table>



<hr/>
<font size="4">
<div align="center"><b>Published Patents</b></div> <br/>
</font>

<table style="background-color:#F1F7FC">
  <tr>
    <td style="text-align:left;vertical-align:top;padding-top:1%;padding-left:1%;" width="25%">    <img src="/images/publications/iv_patent.png" align="left" width="250" />    </td>
    <td width="70%">    <a href="https://patentimages.storage.googleapis.com/06/60/81/2f29a5dd03089e/US20200387163A1.pdf"> 
    <strong> Method and a system for hierarchical network based diverse trajectory proposal</strong> </a> <br/> 
      Brojeshwar Bhowmick, K. Madhava Krishna, Sriram N N, Gourav Kumar, Abhay Singh, M. Siva Karthik, Saket Saurav<br/> 
     <i>US Patent No. 2020/0387163</i><br/>
    <a class="links" href="https://patentimages.storage.googleapis.com/06/60/81/2f29a5dd03089e/US20200387163A1.pdf"> Patent </a>&nbsp; 
    </td> 
  </tr>
</table>




<hr/>
<font size="4">
<div align="center"><b>Bachelor's Projects</b></div> <br/>
</font>

<table style="background-color:#F1F7FC">
  <tr>
    <td style="text-align:left;vertical-align:top;padding-top:1%;padding-left:1%;" width="25%">    <img src="/images/swarath_gif_resize.gif" align="left" width="200" />    </td>
    <!-- <td width="70%">    <a href="https://nnsriram.weebly.com/swarath.html"> 
    <strong> Swarath - Self driving Car </strong> </a> <br/>  -->
    <td width="70%">
    <strong style="color:blue;font-size:18px;"><a href="https://nnsriram.weebly.com/swarath.html"> Swarath - Self driving Car </a></strong><br>
  Internship project at IIIT Delhi during Summer 2017, where I worked on building a SDV prototype. It started with designing controller and planner for the vehicle. Later built perception systems where sensor outputs were used to obtain occupancies. Further, integrated the planner and perception modules together. The internship ended with demonstrating autonomous navigation with GPS waypoints as input. <br>
    <a class="links" href="https://www.youtube.com/watch?v=z3FdsK_w_Nw"> Video </a> &nbsp;
    </td> 
  </tr>
</table>

<!-- <hr> -->

<table style="background-color:#F1F7FC">
<tr>
    <td style="text-align:left;vertical-align:top;padding-top:1%;padding-left:1%;" width="25%">    <img src="/images/btech_thesis_crop.gif" align="left" width="200"/>    </td>
    <!-- <td width="70%">    <a href="https://nnsriram.weebly.com/swahana.html"> 
    <strong> Building Perception, Planning and Control for Autonomous Vehicles </strong> </a> <br/>  -->
    <td width="70%">
    <strong style="color:blue;font-size:18px;"><a href="https://nnsriram.weebly.com/swahana.html"> Building Perception, Planning and Control for Autonomous Vehicles </a></strong><br>
  Bachelor thesis at IIIT Hyderabad, started with designing a low-level controller for a stock car from scratch. Built controllers for throttle, steering and brakes without CAN support. Further integrated perception (ORB-SLAM, LOAM) and planning (RRT*) modules. Demonstrated static obstacle avoidance in tight spaces which was showcased at Research and Development showcase held at IIIT. A part of my thesis culminated into a paper published at AIR 19. <br>
    <a class="links" href="https://drive.google.com/file/d/1CAmw-Pam0xOWf-3rUHwM1NNhlOCeX9a2/view"> Report </a> <a class="links" href="https://www.youtube.com/watch?v=Fs-Pt0M1j5I"> Video </a> &nbsp;
    </td> 
  </tr>
</table>

<!-- <hr> -->
<table style="background-color:#F1F7FC">
<tr>
    <td style="text-align:left;vertical-align:top;padding-top:1%;padding-left:1%;" width="25%">    <img src="/images/projects/collage_bs.png" align="left" width="200"/>    </td>
    <td width="70%">
    <strong style="color:blue;font-size:18px;"><a href="https://drive.google.com/file/d/14Q1tsOjkWNgl8JsLJuONBHBynsyhAjAG/view"> Background Subtraction </a></strong><br>
  Project work on Background Subtraction with Dr. Manigandan during bachelors. Designed a background subtraction algorithm based on mixture models.<br>
  <!-- Designed a novel Background Subtraction algorithm based on univariate Gaussians. Obtained an improved F-Measure of 0.8221 and percentage of false classification as low as 2.6%. Implemented various traditional BS techniques as baselines for comparison.<br> -->
    <a class="links" href="https://drive.google.com/file/d/14Q1tsOjkWNgl8JsLJuONBHBynsyhAjAG/view"> Paper </a> &nbsp;
    </td> 
  </tr>
</table>

<!-- <hr> -->
<table style="background-color:#F1F7FC">
<tr>
    <!-- <td width="20%">    <iframe align="left" width="180" src="https://www.youtube.com/embed/EyNALTEMpUo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> </td> -->
    <td style="text-align:left;vertical-align:top;padding-top:1%;padding-left:1%;" width="25%">    <img src="/images/eyantra_resize.gif" align="left" width="200" />    </td>
    <!-- <td width="5%"></td> -->
    <td width="70%">
    <strong style="color:blue;font-size:18px;"><a href="https://nnsriram.weebly.com/bothoven.html"> Bothoven - Eyantra Robotics Competition </a></strong><br>
  A multi-robot task execution problem, where two robots simultaneously plan paths, coordinate and execute a task of playing an audio file in a concurrent fashion. First FFT is applied to decode the notes from an audio file and is fed as input to the robots. The robots are aware of the map but are unaware of the obstacles present on the map. The map is updated and replanning is done when any one of them encounters an obstacle.<br>
    <a class="links" href="https://www.youtube.com/watch?v=EyNALTEMpUo"> Video </a> &nbsp;
    </td> 
  </tr>
</table>


<!-- <hr> -->
<table style="background-color:#F1F7FC">
<tr>
    <td style="text-align:left;vertical-align:top;padding-top:1%;padding-left:1%;" width="25%">    <img src="/images/projects/husky.png" align="left" width="200"/>    </td>
    <td width="70%">
    <strong style="color:blue;font-size:18px;"><a href="https://nnsriram.weebly.com/husky.html"> Husky - Visual perception based Autonomous bot </a></strong><br>
  Implemented obstacle avoidance and waypoint following in outdoor and indoor scenarios. Sensors like stereo camera, GPS, IMU and wheel encoders were used. Occupancy map was generated upon which planning was done using RRT for the bot to reach the goal autonmously.<br>
    <a class="links" href="https://www.youtube.com/watch?v=XOhP3XEvSok"> Video </a> &nbsp;
    </td> 
  </tr>
</table>

<br>

<hr />

<font size="2">
<div align="center"><b>I am privileged to be associated with the following</b></div>
<table text-align="center">
<tr>
  <td align="center"><a href='https://www.iiitd.ac.in/'><img src='images/iiit_d.png' width='70'></a></td>  
  <td align="center"><a href='http://iiit.ac.in'><img src='images/iiit_h.png' width='80'></a></td>  
  <td align="center"><a href='http://www.nec-labs.com/research-departments/media-analytics/media-analytics-home'><img src='images/nec_logo.png' width='70'></a></td>  
</tr>

<tr>
  <td align="center">Intern</td>
  <td align="center">RA</td>
  <td align="center">Research Scholar</td>
</tr>

<tr>
  <td align="center">Summer 2017</td>
  <td align="center">Dec 2017 - Jul 2019</td>
  <td align="center">Jul 2019 - Present</td>
</tr>

</table>
</font>
<hr/>
