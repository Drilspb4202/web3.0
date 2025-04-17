/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  TokenFactory,
  TokenFactoryInterface,
} from "../../../contracts/TokenFactory.sol/TokenFactory";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "TokenCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "totalSupply",
        type: "uint256",
      },
    ],
    name: "createToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "deployedTokens",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDeployedTokens",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDeployedTokensCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "start",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "end",
        type: "uint256",
      },
    ],
    name: "getTokensInfo",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "tokenAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct TokenFactory.TokenInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "tokenInfo",
    outputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5033600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603620000885760006040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016200007f9190620001a9565b60405180910390fd5b6200009981620000a060201b60201c565b50620001c6565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001918262000164565b9050919050565b620001a38162000184565b82525050565b6000602082019050620001c0600083018462000198565b92915050565b61379d80620001d66000396000f3fe60806040523480156200001157600080fd5b5060043610620000a05760003560e01c8063715018a6116200006f578063715018a614620001555780638da5cb5b1462000161578063ec81aadb1462000183578063f2fde38b14620001b9578063f5dab71114620001d957620000a0565b806325f1be1f14620000a557806345d28c9014620000c75780635b06053014620000fd578063622ae7aa1462000133575b600080fd5b620000af62000213565b604051620000be919062000e5a565b60405180910390f35b620000e56004803603810190620000df919062000ebc565b62000220565b604051620000f491906200114a565b60405180910390f35b6200011b6004803603810190620001159190620012bf565b620005f2565b6040516200012a91906200136a565b60405180910390f35b6200013d62000946565b6040516200014c919062001444565b60405180910390f35b6200015f620009d6565b005b6200016b620009ee565b6040516200017a91906200136a565b60405180910390f35b620001a160048036038101906200019b919062001468565b62000a17565b604051620001b091906200136a565b60405180910390f35b620001d76004803603810190620001d19190620014cb565b62000a57565b005b620001f76004803603810190620001f19190620014cb565b62000ae4565b6040516200020a9594939291906200154f565b60405180910390f35b6000600180549050905090565b606081831062000267576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200025e906200160a565b60405180910390fd5b600180549050821115620002b2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620002a9906200167c565b60405180910390fd5b60008383620002c29190620016cd565b905060008167ffffffffffffffff811115620002e357620002e262001178565b5b6040519080825280602002602001820160405280156200032057816020015b6200030c62000dd6565b815260200190600190039081620003025790505b50905060005b82811015620005e65760006001828862000341919062001708565b8154811062000355576200035462001743565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820180546200043490620017a1565b80601f01602080910402602001604051908101604052809291908181526020018280546200046290620017a1565b8015620004b35780601f106200048757610100808354040283529160200191620004b3565b820191906000526020600020905b8154815290600101906020018083116200049557829003601f168201915b50505050508152602001600282018054620004ce90620017a1565b80601f0160208091040260200160405190810160405280929190818152602001828054620004fc90620017a1565b80156200054d5780601f1062000521576101008083540402835291602001916200054d565b820191906000526020600020905b8154815290600101906020018083116200052f57829003601f168201915b505050505081526020016003820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600482015481525050838381518110620005cc57620005cb62001743565b5b602002602001018190525050808060010191505062000326565b50809250505092915050565b6000808451116200063a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620006319062001826565b60405180910390fd5b600083511162000681576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620006789062001898565b60405180910390fd5b60008211620006c7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620006be906200190a565b60405180910390fd5b600084848433604051620006db9062000e31565b620006ea94939291906200192c565b604051809103906000f08015801562000707573d6000803e3d6000fd5b50905060008190506001819080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040518060a001604052808273ffffffffffffffffffffffffffffffffffffffff1681526020018781526020018681526020013373ffffffffffffffffffffffffffffffffffffffff16815260200142815250600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101908162000862919062001b59565b5060408201518160020190816200087a919062001b59565b5060608201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550608082015181600401559050503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167fcd67a7c35df376bb0365a3982c67488f0ab148116a9514897f52c7c82507c031888842604051620009329392919062001c40565b60405180910390a380925050509392505050565b60606001805480602002602001604051908101604052809291908181526020018280548015620009cc57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001906001019080831162000981575b5050505050905090565b620009e062000c7a565b620009ec600062000d0a565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6001818154811062000a2857600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b62000a6162000c7a565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160362000ad65760006040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260040162000acd91906200136a565b60405180910390fd5b62000ae18162000d0a565b50565b60026020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169080600101805462000b2f90620017a1565b80601f016020809104026020016040519081016040528092919081815260200182805462000b5d90620017a1565b801562000bae5780601f1062000b825761010080835404028352916020019162000bae565b820191906000526020600020905b81548152906001019060200180831162000b9057829003601f168201915b50505050509080600201805462000bc590620017a1565b80601f016020809104026020016040519081016040528092919081815260200182805462000bf390620017a1565b801562000c445780601f1062000c185761010080835404028352916020019162000c44565b820191906000526020600020905b81548152906001019060200180831162000c2657829003601f168201915b5050505050908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060040154905085565b62000c8462000dce565b73ffffffffffffffffffffffffffffffffffffffff1662000ca4620009ee565b73ffffffffffffffffffffffffffffffffffffffff161462000d085762000cca62000dce565b6040517f118cdaa700000000000000000000000000000000000000000000000000000000815260040162000cff91906200136a565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b6040518060a00160405280600073ffffffffffffffffffffffffffffffffffffffff1681526020016060815260200160608152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600081525090565b611adc8062001c8c83390190565b6000819050919050565b62000e548162000e3f565b82525050565b600060208201905062000e71600083018462000e49565b92915050565b6000604051905090565b600080fd5b600080fd5b62000e968162000e3f565b811462000ea257600080fd5b50565b60008135905062000eb68162000e8b565b92915050565b6000806040838503121562000ed65762000ed562000e81565b5b600062000ee68582860162000ea5565b925050602062000ef98582860162000ea5565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000f5c8262000f2f565b9050919050565b62000f6e8162000f4f565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b8381101562000fb057808201518184015260208101905062000f93565b60008484015250505050565b6000601f19601f8301169050919050565b600062000fda8262000f74565b62000fe6818562000f7f565b935062000ff881856020860162000f90565b620010038162000fbc565b840191505092915050565b620010198162000e3f565b82525050565b600060a08301600083015162001039600086018262000f63565b506020830151848203602086015262001053828262000fcd565b915050604083015184820360408601526200106f828262000fcd565b915050606083015162001086606086018262000f63565b5060808301516200109b60808601826200100e565b508091505092915050565b6000620010b483836200101f565b905092915050565b6000602082019050919050565b6000620010d68262000f03565b620010e2818562000f0e565b935083602082028501620010f68562000f1f565b8060005b85811015620011385784840389528151620011168582620010a6565b94506200112383620010bc565b925060208a01995050600181019050620010fa565b50829750879550505050505092915050565b60006020820190508181036000830152620011668184620010c9565b905092915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620011b28262000fbc565b810181811067ffffffffffffffff82111715620011d457620011d362001178565b5b80604052505050565b6000620011e962000e77565b9050620011f78282620011a7565b919050565b600067ffffffffffffffff8211156200121a576200121962001178565b5b620012258262000fbc565b9050602081019050919050565b82818337600083830152505050565b6000620012586200125284620011fc565b620011dd565b90508281526020810184848401111562001277576200127662001173565b5b6200128484828562001232565b509392505050565b600082601f830112620012a457620012a36200116e565b5b8135620012b684826020860162001241565b91505092915050565b600080600060608486031215620012db57620012da62000e81565b5b600084013567ffffffffffffffff811115620012fc57620012fb62000e86565b5b6200130a868287016200128c565b935050602084013567ffffffffffffffff8111156200132e576200132d62000e86565b5b6200133c868287016200128c565b92505060406200134f8682870162000ea5565b9150509250925092565b620013648162000f4f565b82525050565b600060208201905062001381600083018462001359565b92915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6000620013c1838362000f63565b60208301905092915050565b6000602082019050919050565b6000620013e78262001387565b620013f3818562001392565b93506200140083620013a3565b8060005b83811015620014375781516200141b8882620013b3565b97506200142883620013cd565b92505060018101905062001404565b5085935050505092915050565b60006020820190508181036000830152620014608184620013da565b905092915050565b60006020828403121562001481576200148062000e81565b5b6000620014918482850162000ea5565b91505092915050565b620014a58162000f4f565b8114620014b157600080fd5b50565b600081359050620014c5816200149a565b92915050565b600060208284031215620014e457620014e362000e81565b5b6000620014f484828501620014b4565b91505092915050565b600082825260208201905092915050565b60006200151b8262000f74565b620015278185620014fd565b93506200153981856020860162000f90565b620015448162000fbc565b840191505092915050565b600060a08201905062001566600083018862001359565b81810360208301526200157a81876200150e565b905081810360408301526200159081866200150e565b9050620015a1606083018562001359565b620015b0608083018462000e49565b9695505050505050565b7f496e76616c69642072616e676500000000000000000000000000000000000000600082015250565b6000620015f2600d83620014fd565b9150620015ff82620015ba565b602082019050919050565b600060208201905081810360008301526200162581620015e3565b9050919050565b7f456e64206f7574206f662072616e676500000000000000000000000000000000600082015250565b600062001664601083620014fd565b915062001671826200162c565b602082019050919050565b60006020820190508181036000830152620016978162001655565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000620016da8262000e3f565b9150620016e78362000e3f565b92508282039050818111156200170257620017016200169e565b5b92915050565b6000620017158262000e3f565b9150620017228362000e3f565b92508282019050808211156200173d576200173c6200169e565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620017ba57607f821691505b602082108103620017d057620017cf62001772565b5b50919050565b7f4e616d652063616e6e6f7420626520656d707479000000000000000000000000600082015250565b60006200180e601483620014fd565b91506200181b82620017d6565b602082019050919050565b600060208201905081810360008301526200184181620017ff565b9050919050565b7f53796d626f6c2063616e6e6f7420626520656d70747900000000000000000000600082015250565b600062001880601683620014fd565b91506200188d8262001848565b602082019050919050565b60006020820190508181036000830152620018b38162001871565b9050919050565b7f537570706c79206d7573742062652067726561746572207468616e2030000000600082015250565b6000620018f2601d83620014fd565b9150620018ff82620018ba565b602082019050919050565b600060208201905081810360008301526200192581620018e3565b9050919050565b600060808201905081810360008301526200194881876200150e565b905081810360208301526200195e81866200150e565b90506200196f604083018562000e49565b6200197e606083018462001359565b95945050505050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620019eb7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620019ac565b620019f78683620019ac565b95508019841693508086168417925050509392505050565b6000819050919050565b600062001a3a62001a3462001a2e8462000e3f565b62001a0f565b62000e3f565b9050919050565b6000819050919050565b62001a568362001a19565b62001a6e62001a658262001a41565b848454620019b9565b825550505050565b600090565b62001a8562001a76565b62001a9281848462001a4b565b505050565b5b8181101562001aba5762001aae60008262001a7b565b60018101905062001a98565b5050565b601f82111562001b095762001ad38162001987565b62001ade846200199c565b8101602085101562001aee578190505b62001b0662001afd856200199c565b83018262001a97565b50505b505050565b600082821c905092915050565b600062001b2e6000198460080262001b0e565b1980831691505092915050565b600062001b49838362001b1b565b9150826002028217905092915050565b62001b648262000f74565b67ffffffffffffffff81111562001b805762001b7f62001178565b5b62001b8c8254620017a1565b62001b9982828562001abe565b600060209050601f83116001811462001bd1576000841562001bbc578287015190505b62001bc8858262001b3b565b86555062001c38565b601f19841662001be18662001987565b60005b8281101562001c0b5784890151825560018201915060208501945060208101905062001be4565b8683101562001c2b578489015162001c27601f89168262001b1b565b8355505b6001600288020188555050505b505050505050565b6000606082019050818103600083015262001c5c81866200150e565b9050818103602083015262001c7281856200150e565b905062001c83604083018462000e49565b94935050505056fe60806040523480156200001157600080fd5b5060405162001adc38038062001adc83398181016040528101906200003791906200059e565b838381600390816200004a91906200088f565b5080600490816200005c91906200088f565b5050506200009b8162000074620000a560201b60201c565b600a62000082919062000b06565b846200008f919062000b57565b620000ae60201b60201c565b5050505062000c76565b60006012905090565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603620001235760006040517fec442f050000000000000000000000000000000000000000000000000000000081526004016200011a919062000bb3565b60405180910390fd5b62000137600083836200013b60201b60201c565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036200019157806002600082825462000184919062000bd0565b9250508190555062000267565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508181101562000220578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401620002179392919062000c1c565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603620002b25780600260008282540392505081905550620002ff565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516200035e919062000c59565b60405180910390a3505050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620003d48262000389565b810181811067ffffffffffffffff82111715620003f657620003f56200039a565b5b80604052505050565b60006200040b6200036b565b9050620004198282620003c9565b919050565b600067ffffffffffffffff8211156200043c576200043b6200039a565b5b620004478262000389565b9050602081019050919050565b60005b838110156200047457808201518184015260208101905062000457565b60008484015250505050565b60006200049762000491846200041e565b620003ff565b905082815260208101848484011115620004b657620004b562000384565b5b620004c384828562000454565b509392505050565b600082601f830112620004e357620004e26200037f565b5b8151620004f584826020860162000480565b91505092915050565b6000819050919050565b6200051381620004fe565b81146200051f57600080fd5b50565b600081519050620005338162000508565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620005668262000539565b9050919050565b620005788162000559565b81146200058457600080fd5b50565b60008151905062000598816200056d565b92915050565b60008060008060808587031215620005bb57620005ba62000375565b5b600085015167ffffffffffffffff811115620005dc57620005db6200037a565b5b620005ea87828801620004cb565b945050602085015167ffffffffffffffff8111156200060e576200060d6200037a565b5b6200061c87828801620004cb565b93505060406200062f8782880162000522565b9250506060620006428782880162000587565b91505092959194509250565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620006a157607f821691505b602082108103620006b757620006b662000659565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620007217fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620006e2565b6200072d8683620006e2565b95508019841693508086168417925050509392505050565b6000819050919050565b6000620007706200076a6200076484620004fe565b62000745565b620004fe565b9050919050565b6000819050919050565b6200078c836200074f565b620007a46200079b8262000777565b848454620006ef565b825550505050565b600090565b620007bb620007ac565b620007c881848462000781565b505050565b5b81811015620007f057620007e4600082620007b1565b600181019050620007ce565b5050565b601f8211156200083f576200080981620006bd565b6200081484620006d2565b8101602085101562000824578190505b6200083c6200083385620006d2565b830182620007cd565b50505b505050565b600082821c905092915050565b6000620008646000198460080262000844565b1980831691505092915050565b60006200087f838362000851565b9150826002028217905092915050565b6200089a826200064e565b67ffffffffffffffff811115620008b657620008b56200039a565b5b620008c2825462000688565b620008cf828285620007f4565b600060209050601f831160018114620009075760008415620008f2578287015190505b620008fe858262000871565b8655506200096e565b601f1984166200091786620006bd565b60005b8281101562000941578489015182556001820191506020850194506020810190506200091a565b868310156200096157848901516200095d601f89168262000851565b8355505b6001600288020188555050505b505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008160011c9050919050565b6000808291508390505b600185111562000a0457808604811115620009dc57620009db62000976565b5b6001851615620009ec5780820291505b8081029050620009fc85620009a5565b9450620009bc565b94509492505050565b60008262000a1f576001905062000af2565b8162000a2f576000905062000af2565b816001811462000a48576002811462000a535762000a89565b600191505062000af2565b60ff84111562000a685762000a6762000976565b5b8360020a91508482111562000a825762000a8162000976565b5b5062000af2565b5060208310610133831016604e8410600b841016171562000ac35782820a90508381111562000abd5762000abc62000976565b5b62000af2565b62000ad28484846001620009b2565b9250905081840481111562000aec5762000aeb62000976565b5b81810290505b9392505050565b600060ff82169050919050565b600062000b1382620004fe565b915062000b208362000af9565b925062000b4f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff848462000a0d565b905092915050565b600062000b6482620004fe565b915062000b7183620004fe565b925082820262000b8181620004fe565b9150828204841483151762000b9b5762000b9a62000976565b5b5092915050565b62000bad8162000559565b82525050565b600060208201905062000bca600083018462000ba2565b92915050565b600062000bdd82620004fe565b915062000bea83620004fe565b925082820190508082111562000c055762000c0462000976565b5b92915050565b62000c1681620004fe565b82525050565b600060608201905062000c33600083018662000ba2565b62000c42602083018562000c0b565b62000c51604083018462000c0b565b949350505050565b600060208201905062000c70600083018462000c0b565b92915050565b610e568062000c866000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063313ce56711610066578063313ce5671461013457806370a082311461015257806395d89b4114610182578063a9059cbb146101a0578063dd62ed3e146101d057610093565b806306fdde0314610098578063095ea7b3146100b657806318160ddd146100e657806323b872dd14610104575b600080fd5b6100a0610200565b6040516100ad9190610aaa565b60405180910390f35b6100d060048036038101906100cb9190610b65565b610292565b6040516100dd9190610bc0565b60405180910390f35b6100ee6102b5565b6040516100fb9190610bea565b60405180910390f35b61011e60048036038101906101199190610c05565b6102bf565b60405161012b9190610bc0565b60405180910390f35b61013c6102ee565b6040516101499190610c74565b60405180910390f35b61016c60048036038101906101679190610c8f565b6102f7565b6040516101799190610bea565b60405180910390f35b61018a61033f565b6040516101979190610aaa565b60405180910390f35b6101ba60048036038101906101b59190610b65565b6103d1565b6040516101c79190610bc0565b60405180910390f35b6101ea60048036038101906101e59190610cbc565b6103f4565b6040516101f79190610bea565b60405180910390f35b60606003805461020f90610d2b565b80601f016020809104026020016040519081016040528092919081815260200182805461023b90610d2b565b80156102885780601f1061025d57610100808354040283529160200191610288565b820191906000526020600020905b81548152906001019060200180831161026b57829003601f168201915b5050505050905090565b60008061029d61047b565b90506102aa818585610483565b600191505092915050565b6000600254905090565b6000806102ca61047b565b90506102d7858285610495565b6102e285858561052a565b60019150509392505050565b60006012905090565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60606004805461034e90610d2b565b80601f016020809104026020016040519081016040528092919081815260200182805461037a90610d2b565b80156103c75780601f1061039c576101008083540402835291602001916103c7565b820191906000526020600020905b8154815290600101906020018083116103aa57829003601f168201915b5050505050905090565b6000806103dc61047b565b90506103e981858561052a565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b610490838383600161061e565b505050565b60006104a184846103f4565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8110156105245781811015610514578281836040517ffb8f41b200000000000000000000000000000000000000000000000000000000815260040161050b93929190610d6b565b60405180910390fd5b6105238484848403600061061e565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361059c5760006040517f96c6fd1e0000000000000000000000000000000000000000000000000000000081526004016105939190610da2565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361060e5760006040517fec442f050000000000000000000000000000000000000000000000000000000081526004016106059190610da2565b60405180910390fd5b6106198383836107f5565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16036106905760006040517fe602df050000000000000000000000000000000000000000000000000000000081526004016106879190610da2565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036107025760006040517f94280d620000000000000000000000000000000000000000000000000000000081526004016106f99190610da2565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555080156107ef578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516107e69190610bea565b60405180910390a35b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361084757806002600082825461083b9190610dec565b9250508190555061091a565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050818110156108d3578381836040517fe450d38c0000000000000000000000000000000000000000000000000000000081526004016108ca93929190610d6b565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361096357806002600082825403925050819055506109b0565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610a0d9190610bea565b60405180910390a3505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610a54578082015181840152602081019050610a39565b60008484015250505050565b6000601f19601f8301169050919050565b6000610a7c82610a1a565b610a868185610a25565b9350610a96818560208601610a36565b610a9f81610a60565b840191505092915050565b60006020820190508181036000830152610ac48184610a71565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610afc82610ad1565b9050919050565b610b0c81610af1565b8114610b1757600080fd5b50565b600081359050610b2981610b03565b92915050565b6000819050919050565b610b4281610b2f565b8114610b4d57600080fd5b50565b600081359050610b5f81610b39565b92915050565b60008060408385031215610b7c57610b7b610acc565b5b6000610b8a85828601610b1a565b9250506020610b9b85828601610b50565b9150509250929050565b60008115159050919050565b610bba81610ba5565b82525050565b6000602082019050610bd56000830184610bb1565b92915050565b610be481610b2f565b82525050565b6000602082019050610bff6000830184610bdb565b92915050565b600080600060608486031215610c1e57610c1d610acc565b5b6000610c2c86828701610b1a565b9350506020610c3d86828701610b1a565b9250506040610c4e86828701610b50565b9150509250925092565b600060ff82169050919050565b610c6e81610c58565b82525050565b6000602082019050610c896000830184610c65565b92915050565b600060208284031215610ca557610ca4610acc565b5b6000610cb384828501610b1a565b91505092915050565b60008060408385031215610cd357610cd2610acc565b5b6000610ce185828601610b1a565b9250506020610cf285828601610b1a565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610d4357607f821691505b602082108103610d5657610d55610cfc565b5b50919050565b610d6581610af1565b82525050565b6000606082019050610d806000830186610d5c565b610d8d6020830185610bdb565b610d9a6040830184610bdb565b949350505050565b6000602082019050610db76000830184610d5c565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610df782610b2f565b9150610e0283610b2f565b9250828201905080821115610e1a57610e19610dbd565b5b9291505056fea2646970667358221220e8512d1a5cc4e2025eb7e18ffb81108d54d9cbca35ccb79f9bbedae80f425cb264736f6c63430008180033a26469706673582212206f5b59e4de73c3371827455689244ae1ca3d5e454a359ea8e6c264292aa6808864736f6c63430008180033";

type TokenFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TokenFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TokenFactory__factory extends ContractFactory {
  constructor(...args: TokenFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      TokenFactory & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): TokenFactory__factory {
    return super.connect(runner) as TokenFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenFactoryInterface {
    return new Interface(_abi) as TokenFactoryInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): TokenFactory {
    return new Contract(address, _abi, runner) as unknown as TokenFactory;
  }
}
