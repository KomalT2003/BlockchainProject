// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Records {
    struct Patient {
        string diagnosis;
        string treatment;
        string docName;
        address docAddress;
        uint timestamp;
        bool approved;
        bool isPatient;
    }

    struct Doctor {
        address DocAddress;
    }

    struct Admin {
        address adminAddress;
        bool created;
    }

    uint public countPatient;

    mapping(address => Patient) patients;
    mapping(address => Doctor) doctors;
    mapping(address => Admin) admins;
    mapping(address => mapping(address => bool)) isApproved;
    mapping(address => Patient[]) dataOfPatient;
    mapping(address => address[]) adminToDoc;

    function createAdmin() public {
        admins[msg.sender].adminAddress = msg.sender;
        admins[msg.sender].created = true;
    }

    modifier onlyAdmin() {
        require(admins[msg.sender].created, "Only admin can call this function");
        _;
    }

    modifier onlyPatient(address _patientAddress) {
        require(patients[_patientAddress].isPatient, "Only patient can call this function");
        _;
    }

    function givePermission(address _address) public onlyPatient(msg.sender) returns(bool success) {
        isApproved[msg.sender][_address] = true;
        return true;
    }

    function RevokePermission(address _address) public onlyPatient(msg.sender) returns(bool success) {
        isApproved[msg.sender][_address] = false;
        return true;
    }


    function addPatientData(address _patientAddress, string memory _diagnosis, string memory _treatment, string memory _docName, address _docAddress) public onlyAdmin {
        dataOfPatient[_patientAddress].push(patients[_patientAddress] = Patient(_diagnosis, _treatment, _docName, _docAddress, block.timestamp, false, true));
        countPatient++;
    }

    function approvePatientData() public onlyPatient(msg.sender) {
        require(patients[msg.sender].approved == false, "Patient data already approved");
        patients[msg.sender].approved = true;
    }


    function getPatientData(address _address) public view returns (string memory, string memory, string memory, address) {
        require(_address == msg.sender || isApproved[_address][msg.sender], "Only patients can access data until authorised");
        return (
            patients[_address].diagnosis,
            patients[_address].treatment,
            patients[_address].docName,
            patients[_address].docAddress
        );
    }

    function createDoctor() public {
        doctors[msg.sender].DocAddress = msg.sender;
    }

    function addAdmin(address _adminAdd) public {
        adminToDoc[_adminAdd].push(msg.sender);
    }

    function getAllData(address _add) public view returns(Patient[] memory) {
        return dataOfPatient[_add];
    }

    function getAllDocs(address _add) public view returns(address[] memory) {
        return adminToDoc[_add];
    }
}