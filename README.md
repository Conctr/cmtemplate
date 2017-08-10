## Statement of Goals


**Wimo is a tool for maintaining wine quality when in storage.**

 The system monitors temperature, humidity, volatile organic compounds and movement in a time series, pushes an alarm when a controlled parameter is exceeded, and then displays relevant data when viewed in the application dashboard.  
 
To 

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


## Version Control

We will be using the GitFlow branching model for version control, as this makes parallel development by teams more efficient. 

## Conctr API

* put the text about conctr here *

## Material-UI

* put the text about M-UI here *

## Atomic Design Theory

* put the text about design here *

## Authorisation and OAuth2

* put the text about OAuth2 here *

## Conctr client library

* put the text about AHC here *

## Milestones

####Deadlines for completion and expected deliverables.

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