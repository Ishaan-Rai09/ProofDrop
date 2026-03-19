// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DeliverySystem {
    struct Delivery {
        string deliveryId;
        address sender;
        address agent;
        address receiver;
        string status;
        uint256 timestamp;
        bool isConfirmed;
    }

    mapping(string => Delivery) public deliveries;
    mapping(string => bool) public deliveryExists;

    event DeliveryCreated(
        string indexed deliveryId,
        address indexed sender,
        address indexed receiver,
        address agent,
        uint256 timestamp
    );

    event DeliveryStatusUpdated(
        string indexed deliveryId,
        string status,
        uint256 timestamp
    );

    event DeliveryConfirmed(
        string indexed deliveryId,
        address indexed receiver,
        uint256 timestamp
    );

    function createDelivery(
        string memory _deliveryId,
        address _receiver,
        address _agent
    ) public {
        require(!deliveryExists[_deliveryId], "Delivery ID already exists");
        require(_receiver != address(0), "Invalid receiver address");
        require(_agent != address(0), "Invalid agent address");

        deliveries[_deliveryId] = Delivery({
            deliveryId: _deliveryId,
            sender: msg.sender,
            agent: _agent,
            receiver: _receiver,
            status: "Created",
            timestamp: block.timestamp,
            isConfirmed: false
        });

        deliveryExists[_deliveryId] = true;

        emit DeliveryCreated(
            _deliveryId,
            msg.sender,
            _receiver,
            _agent,
            block.timestamp
        );
    }

    function updateStatus(string memory _deliveryId, string memory _status) public {
        require(deliveryExists[_deliveryId], "Delivery does not exist");
        Delivery storage delivery = deliveries[_deliveryId];
        require(!delivery.isConfirmed, "Delivery already confirmed");
        
        // Either sender or agent can update status, but usually agent
        require(
            msg.sender == delivery.agent || msg.sender == delivery.sender,
            "Not authorized to update status"
        );

        delivery.status = _status;
        delivery.timestamp = block.timestamp;

        emit DeliveryStatusUpdated(_deliveryId, _status, block.timestamp);
    }

    function confirmDelivery(string memory _deliveryId) public {
        require(deliveryExists[_deliveryId], "Delivery does not exist");
        Delivery storage delivery = deliveries[_deliveryId];
        require(!delivery.isConfirmed, "Delivery already confirmed");
        require(msg.sender == delivery.receiver, "Only receiver can confirm");

        delivery.status = "Delivered";
        delivery.isConfirmed = true;
        delivery.timestamp = block.timestamp;

        emit DeliveryConfirmed(_deliveryId, msg.sender, block.timestamp);
    }

    function getDelivery(string memory _deliveryId)
        public
        view
        returns (Delivery memory)
    {
        require(deliveryExists[_deliveryId], "Delivery does not exist");
        return deliveries[_deliveryId];
    }
}