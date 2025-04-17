// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BusinessToken
 * @dev Реализация ERC20 токена для бизнеса с предварительной эмиссией
 */
contract BusinessToken is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        address creator
    ) ERC20(name, symbol) {
        _mint(creator, totalSupply * 10**decimals());
    }
}

/**
 * @title TokenFactory
 * @dev Фабрика для создания токенов малого бизнеса
 * Позволяет любому пользователю создать свой ERC20 токен
 */
contract TokenFactory is Ownable {
    // Хранение всех созданных токенов
    address[] public deployedTokens;
    
    // Информация о созданном токене
    struct TokenInfo {
        address tokenAddress;
        string name;
        string symbol;
        address creator;
        uint256 timestamp;
    }
    
    // Маппинг для хранения информации о токенах
    mapping(address => TokenInfo) public tokenInfo;
    
    // События
    event TokenCreated(
        address indexed tokenAddress,
        string name,
        string symbol,
        address indexed creator,
        uint256 timestamp
    );
    
    constructor() Ownable(msg.sender) {}
    
    /**
     * @dev Создает новый ERC20 токен
     * @param name Название токена
     * @param symbol Символ токена
     * @param totalSupply Общее количество токенов (без учета десятичных знаков)
     * @return address Адрес созданного токена
     */
    function createToken(
        string memory name,
        string memory symbol,
        uint256 totalSupply
    ) external returns (address) {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(symbol).length > 0, "Symbol cannot be empty");
        require(totalSupply > 0, "Supply must be greater than 0");
        
        // Создаем новый токен
        BusinessToken newToken = new BusinessToken(
            name,
            symbol,
            totalSupply,
            msg.sender
        );
        
        // Сохраняем информацию о токене
        address tokenAddress = address(newToken);
        deployedTokens.push(tokenAddress);
        
        tokenInfo[tokenAddress] = TokenInfo({
            tokenAddress: tokenAddress,
            name: name,
            symbol: symbol,
            creator: msg.sender,
            timestamp: block.timestamp
        });
        
        // Вызываем событие о создании токена
        emit TokenCreated(
            tokenAddress,
            name,
            symbol,
            msg.sender,
            block.timestamp
        );
        
        return tokenAddress;
    }
    
    /**
     * @dev Возвращает список всех созданных токенов
     * @return address[] Массив адресов токенов
     */
    function getDeployedTokens() external view returns (address[] memory) {
        return deployedTokens;
    }
    
    /**
     * @dev Возвращает количество созданных токенов
     * @return uint256 Количество токенов
     */
    function getDeployedTokensCount() external view returns (uint256) {
        return deployedTokens.length;
    }
    
    /**
     * @dev Возвращает информацию о созданных токенах в указанном диапазоне
     * @param start Начальный индекс
     * @param end Конечный индекс
     * @return TokenInfo[] Массив информации о токенах
     */
    function getTokensInfo(uint256 start, uint256 end) 
        external 
        view 
        returns (TokenInfo[] memory) 
    {
        require(start < end, "Invalid range");
        require(end <= deployedTokens.length, "End out of range");
        
        uint256 length = end - start;
        TokenInfo[] memory tokens = new TokenInfo[](length);
        
        for (uint256 i = 0; i < length; i++) {
            address tokenAddress = deployedTokens[start + i];
            tokens[i] = tokenInfo[tokenAddress];
        }
        
        return tokens;
    }
} 