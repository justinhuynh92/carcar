# CarCar

Team:

Justin Huynh - Service
Jonathan Cornejo - Sales

## Getting Started
1. Fork and clone the project with this command:
`git clone <repo url>`
2. Make sure you're in the right directory
`CD project-beta`
3. Run the following commands to start docker desktop:
`docker volume create beta-data`
`docker-compose build`
`docker-copose up`
4. There should be seven containers with a green status to signify that its running.
5. Open up Chrome(Browser) and go to http://localhost:3000/ in the address bar.

## Design

CarCar is made up of 3 microservices:
- Inventory 
- Service
- Sales

![IMAGE_DESCRIPTION](file:///Users/justinhuynh/Downloads/project-beta-excalidraw.jpg)

## Service microservice
The service is made up of 3 services: AutomobileVO, Technician, and Appointment.

The AutomobileVO model has these properties: vin, sold, and import_href. This model represents the Automobile model in the inventory microservice, which polls the data to update or create the value object to use.

The Technician model has these properties: name and employee_number. This model creates and stores data related to the technician.

The Appointment model has these properties: vin, customer_name, date, reason, status, vip, and technician. This model is used to create and store data for all appointments made. The date, reason, and customer_name is used to fill out basic information. The vin is used to keep track of the specific automobile vin number, which goes hand in hand with the vip property so we know if that customre gets vip treatment. The technician is a foreign key so that when an appointment is made, a designated technician employee is assigned to that customer. 

This service is going to broken down into different API endpoints (url for web addresses) for service as well as the format for sending data to each componenet.
- Technicians
- Appointments

**Technicians API**
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List Technicians | GET | http://localhost:8080/api/technicians/
| Create a Technician | POST | http://localhost:8080/api/technicians/
| Delete a Technician | DELETE | http://localhost:8080/api/technicians/:id/

<details><summary>GET: List of Technicians</summary>
Returns:
{
    "href": "/api/technicians/5/",
    "name": "asdf",
    "employee_number": 5,
    "id": 5
}

</details>

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
