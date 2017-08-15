## Statement of Goals


**Wimo is a tool for maintaining wine quality when in storage.**

 The system monitors temperature, humidity, volatile organic compounds and movement in a time series, pushes an alarm when a controlled parameter is exceeded, and then displays relevant data when viewed in the application dashboard.  
 
To provide this functionality, Wimo relies on the Mystic Pants Conctr device, which provides an IoT platform that takes care of all back end requirements. In effect, **Wimo is a React front-end dashboard framework which is designed to work seamlessly with a Conctr back-end**, and provide environmental data from the device with minimal additional code required. 

#### A rapid workflow to create your own front-end for Conctr is to fork this repository, run **Yarn** in your command line, and then **Yarn start** to start up your development server. Make your changes, and the "heavy lifting" is done for you.


### The problem the application is designed to solve

When in storage, large variations in temperature and humidity can affect wine quality, rendering very valuable wine undrinkable because of aerobic and anaerobic processes that take place in different storage conditions.

Wimo is intended to solve the problem of wine spoilage when in storage, by allowing the owner to determine when changes are needed to storage conditions.


## Functional Description


The application uses the **conctr** device to measure environmental factors in an enclosed space, usually a wine cellar.


The device owner will provide a set of high and low ranges for a number of variables, such as temperature and humidity in the system online dashboard. *The device will send an alarm when a range is exceeded*, for example when temperature exceeds 25 degrees centigrade. The owner can then act on that information by changing the conditions.  

The system owner will also be able to view an online dashboard which allows them to review the historical environmental conditions to check for variances which may affect wine quality.  


## User Interface

~~~
Insert an image of the dashboard here
~~~

Include wireframes for each page, with detailed descriptions of:

    Each control, including states (high/low/outside optimal) and operations.
    Supported orientations and transitions between them.
    Functionality represented.
    Error handling.
    Dimensions and constraints.

![Wimo](wimo-bg.png "sweetberry wine")

These mockups have been created using Sketch, a common wireframing tool.

The UI description will look like:

    Navigation Bar
        Left navigation control: return to home page
        Title bar: current screen or operation name
        New button: create a new Thing
    Table View
        Section 0: Section title
        Section 0 rows:
            Row control 0 (e.g., image)
            Text Line 0
            Text Line 2

## Technologies Used

The following libraries and their dependencies are used by Wimo:

- React
- React-DOM
- React-Router
- Victory
- Prop-types
- Sass


## Version Control

We will be using the GitFlow branching model for version control, as this makes parallel development by teams more efficient. **We recommend you follow the same model when developing your own application, as many aspects of the application have been optimised for this workflow**. The Mystic Pants team also use this model, so many things will be easier to grok if you get with the program.

GitFlow is a branching model for Git. It has attracted a lot of attention because it is very well suited to collaboration and scaling the development team.

One of the good things about GitFlow is that it makes parallel development very easy, by isolating new development from finished work. New development (such as features and non-emergency bug fixes) is done in feature branches, and is only merged back into main body of code when the developer is happy that the code is ready for release.

In practice, if you are asked to switch from one task to another, all you need to do is commit your changes and then create a new feature branch for your new task. When that task is done, just checkout your original feature branch and you can continue where you left off.

Feature branches also make it easier for two or more developers to collaborate on the same feature, because each feature branch is a sandbox where the only changes are the changes necessary to get the new feature working. That makes it very easy to see and follow what each collaborator is doing.

As new development is completed, it gets merged back into the develop branch, which is a staging area for all completed features that haven’t yet been released. So when the next release is branched off of develop, it will automatically contain all of the new stuff that has been finished.

GitFlow supports hotfix branches - branches made from a tagged release. You can use these to make an emergency change, safe in the knowledge that the hotfix will only contain your emergency fix. There’s no risk that you’ll accidentally merge in new development at the same time.

## Conctr API

Conctr is dubbed " a one stop platform that takes care of IoT complexity and lets you focus on what’s important."
* put the text about conctr here *

## Material-UI

A Set of React Components that Implement Google's Material Design

Develop a single underlying system that allows for a unified experience across platforms and device sizes. Mobile precepts are fundamental, but touch, voice, mouse, and keyboard are all ﬁrst-class input methods.
* put the text about M-UI here *

## Atomic Design Theory

Atomic design is a methodology composed of five distinct stages working together to create interface design systems in a more deliberate and hierarchical manner. It works from the principle that structuring a web application framework can learn from the world of chemistry in terms of breaking down large, intractable structures into bite-size pieces. We can simultaneously see our interfaces broken down to their atomic elements and also see how those elements combine together to form our final experiences.

The five stages of atomic design are:

- Atoms
  If atoms are the basic building blocks of matter, then the atoms of our interfaces serve as the foundational building blocks that comprise all our user interfaces. These atoms include basic HTML elements like form labels, inputs, buttons, and others that can’t be broken down any further without ceasing to be functional.

- Molecules
  In interfaces, molecules are relatively simple groups of UI elements functioning together as a unit. For example, a form label, search input, and button can join together to create a search form molecule.

- Organisms
  Organisms are relatively complex UI components composed of groups of molecules and/or atoms and/or other organisms. These organisms form distinct sections of an interface.

- Templates
  Templates are page-level objects that place components into a layout and articulate the design’s underlying content structure. To build on our previous example, we can take the header organism and apply it to a homepage template.

- Pages
  Pages are specific instances of templates that show what a UI looks like with real representative content in place. We can take a homepage template and pour representative text, images, and media into the template to show real content in action.


## Authorisation and OAuth2

OAuth 2 is an authorization framework that enables applications to obtain limited access to user accounts on an HTTP service, such as Facebook, GitHub, and DigitalOcean. It works by delegating user authentication to the service that hosts the user account, and authorizing third-party applications to access the user account. OAuth 2 provides authorisation flows for web and desktop applications, and mobile devices.

Wimo implements OAuth2 in our login page, to allow users to utilise their Google accounts for login and user authentication. We intend to implement Facebook and LinkedIn authorisation as well, but these features are not yet available.

## Conctr client library

Conctr consists of a set of highly scalable platform components that deal with the key requirements of Model Definition, Data Ingestion, Device Management, Messaging and Control and Application Enablement.

Conctr users are defined using the Conctr cloud web application. Each product consists of a device model attached to a user. Multiple users may be defined and collaborate across multiple device models. 
Each model is defined in the Conctr web application. A model definition describes a data structure that will be used to ingest data from each individual IoT device.

Standard data typing with bounded data field definitions allow for the quick creation of new models which are immediately available for data ingestion via any supported protocol. Devices represent individual connected products attached to the platform. Devices are managed by the device management console and via the device API.

The model definitions are available as JSON structures in the web interface to facilitate rapid
deployment of a devices code using our API’s, SDK’s and standard interfaces.


## Milestones

#### Deadlines for completion and expected deliverables.

The Project Completion Date is scheduled for 25 August 2017.
Milestone Delivery Dates are:

      - User Stories = 4 August 2017
      - Wireframes = 4 August 2017
      - Wimo application v0.1.0 = 11 August 2017
      - Wimo application v1.0.0 = 25 August 2017

*The milestones section in our design document will be made up of milestones such as:*

    Facade Application showing screen and with temporary transitions and example images/text: TBD
    Communication Protocol: application connects to network/server: TBD
    Functional Milestone 1: Minimum Viable Product: TBD
    Wimo Application (with full functionality): TBD
    Stability: TBD
    Release: TBD

## Conclusion

*How to deal with changes as we go along.* 

As the specification changes, updates will be included by the developer in both the github repository and the documentation. Changes will simply modify the existing codebase, while being recorded in the documentation and in the team repository on [Github](https://github.com/conctr/wimo).

The complete application should allow for the monitoring of environmental factors in the wine storage vessel to maintain an environment which will allow the maturation process to occur without introducing spoilage or unwanted flavour profile characteristics. 

All updates should include the following information:
    What was the team just working on?
    What is the team member currently working on?
    What will the development team work on next?
