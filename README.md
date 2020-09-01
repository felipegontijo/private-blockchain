# Private Blockchain Application

This is a private blockchain application created for exploring this unique and fascinating technology.

It is an application to store information about stars on-chain to take advantage of the characteristics of blockchain technology. Moreover, the app allows for ownership to be tracked for each star (proof of existence) through the usage of digital identity (Bitcoin wallet).

# Functionality

The app takes advantage of blockchain technology and Bitcoin protocol to perform actions and interact with users.

The user can submit data into the chain, by requesting a timely message from the app and signing it with their Bitcoin wallet. This data submission results in a new block added to the chain -- if the message and signature are verified and truthful.

# Stack

The application is mainly a backend, built in Node.js and Express. ES6 is employed to facilitate with the usage of Classes, even though they are just synthax sugar. Many libraries are used to perform the cryptographic actions (crypto-js and hex2ascii) as well as to allow for proof of existence and digital signatures to be leveraged (bitcoinjs and bitcoinjs-message).
