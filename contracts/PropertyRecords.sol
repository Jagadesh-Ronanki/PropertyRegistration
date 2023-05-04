// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PropertyOwnership
 * @dev This contract allows an authorized person to register a property and mint an NFT representing the property.
 * The NFT will be minted to the owner's wallet address.
 */
contract PropertyRecords is ERC721, Ownable {
    // A struct representing a property
    struct Property {
        string ownerName;
        address ownerWalletAddress;
        string landLocation;
        uint256 propertyValue;
        uint256 surveyNumber;
        string image;
    }

    // A mapping of property ID to the Property struct
    mapping(uint256 => Property) public properties;

    // Event emitted when a new property is registered
    event PropertyRegistered(uint256 indexed propertyId, string ownerName, string landLocation, uint256 propertyValue, uint256 surveyNumber);

    // The total number of registered properties
    uint256 private totalSupply_;

    /**
     * @dev Constructor that initializes the ERC721 token.
     */
    constructor() ERC721("Property NFT", "PROP") {}

    /**
     * @dev Registers a new property and mints an NFT representing the property.
     * @param ownerName The name of the owner of the property.
     * @param ownerWalletAddress The wallet address of the owner of the property.
     * @param landLocation The location of the property.
     * @param propertyValue The value of the property.
     * @param surveyNumber The survey number of the property.
     * @param image The image representing the property.
     * @return The ID of the new property.
     */
    function registerProperty(string memory ownerName, address ownerWalletAddress, string memory landLocation, uint256 propertyValue, uint256 surveyNumber, string memory image) public onlyOwner returns (uint256) {
        // Increment the total supply count
        totalSupply_++;

        // Generate a new property ID
        uint256 propertyId = totalSupply_;

        // Create a new Property struct
        Property memory newProperty = Property(ownerName, ownerWalletAddress, landLocation, propertyValue, surveyNumber, image);

        // Store the new property in the mapping
        properties[propertyId] = newProperty;

        // Mint a new NFT to the owner's wallet address
        _safeMint(ownerWalletAddress, propertyId);

        // Emit a PropertyRegistered event
        emit PropertyRegistered(propertyId, ownerName, landLocation, propertyValue, surveyNumber);

        // Return the ID of the new property
        return propertyId;
    }

    function getPropertyDetails(uint256 propertyId) public view returns (string memory ownerName, address ownerWalletAddress, string memory landLocation, uint256 propertyValue, uint256 surveyNumber, string memory image) {
        require(_exists(propertyId), "Property does not exist");
        
        Property storage property = properties[propertyId];

        ownerName = property.ownerName;
        ownerWalletAddress = property.ownerWalletAddress;
        landLocation = property.landLocation;
        propertyValue = property.propertyValue;
        surveyNumber = property.surveyNumber;
        image = property.image;
    }

    /**
     * @dev Returns the total number of registered properties.
     * @return The total number of registered properties.
     */
    function totalSupply() public view returns (uint256) {
        return totalSupply_;
    }
}
