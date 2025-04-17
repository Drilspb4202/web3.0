import { expect } from "chai";
import { ethers } from "hardhat";
import { TokenFactory } from "../typechain-types";

describe("TokenFactory", function () {
  let tokenFactory: TokenFactory;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    // Получаем подписантов для тестов
    [owner, addr1, addr2] = await ethers.getSigners();

    // Деплоим контракт TokenFactory
    const TokenFactoryContract = await ethers.getContractFactory("TokenFactory");
    tokenFactory = await TokenFactoryContract.deploy();
  });

  describe("Создание токена", function () {
    it("Должен создать новый токен с правильными параметрами", async function () {
      const name = "Business Token";
      const symbol = "BIZ";
      const totalSupply = 1000000;

      // Создаем токен от имени addr1
      const tx = await tokenFactory.connect(addr1).createToken(name, symbol, totalSupply);
      const receipt = await tx.wait();

      // Проверяем событие TokenCreated
      const event = receipt?.logs[0];
      expect(event).to.not.be.undefined;

      // Получаем список токенов
      const deployedTokens = await tokenFactory.getDeployedTokens();
      expect(deployedTokens.length).to.equal(1);

      // Проверяем информацию о токене
      const tokenInfo = await tokenFactory.tokenInfo(deployedTokens[0]);
      expect(tokenInfo.name).to.equal(name);
      expect(tokenInfo.symbol).to.equal(symbol);
      expect(tokenInfo.creator).to.equal(addr1.address);
    });

    it("Не должен создавать токен с пустым именем", async function () {
      await expect(
        tokenFactory.createToken("", "SYM", 1000)
      ).to.be.revertedWith("Name cannot be empty");
    });

    it("Не должен создавать токен с пустым символом", async function () {
      await expect(
        tokenFactory.createToken("Name", "", 1000)
      ).to.be.revertedWith("Symbol cannot be empty");
    });

    it("Не должен создавать токен с нулевым общим предложением", async function () {
      await expect(
        tokenFactory.createToken("Name", "SYM", 0)
      ).to.be.revertedWith("Supply must be greater than 0");
    });
  });

  describe("Получение информации о токенах", function () {
    beforeEach(async function () {
      // Создаем несколько токенов для тестирования
      await tokenFactory.connect(addr1).createToken("Token1", "TK1", 1000);
      await tokenFactory.connect(addr2).createToken("Token2", "TK2", 2000);
      await tokenFactory.connect(owner).createToken("Token3", "TK3", 3000);
    });

    it("Должен возвращать правильное количество токенов", async function () {
      const count = await tokenFactory.getDeployedTokensCount();
      expect(count).to.equal(3);
    });

    it("Должен возвращать правильный список адресов токенов", async function () {
      const tokens = await tokenFactory.getDeployedTokens();
      expect(tokens.length).to.equal(3);
    });

    it("Должен возвращать информацию о токенах в указанном диапазоне", async function () {
      const tokensInfo = await tokenFactory.getTokensInfo(0, 2);
      expect(tokensInfo.length).to.equal(2);
      expect(tokensInfo[0].name).to.equal("Token1");
      expect(tokensInfo[1].name).to.equal("Token2");
    });

    it("Должен выдавать ошибку при неверном диапазоне", async function () {
      await expect(
        tokenFactory.getTokensInfo(2, 1)
      ).to.be.revertedWith("Invalid range");

      await expect(
        tokenFactory.getTokensInfo(0, 4)
      ).to.be.revertedWith("End out of range");
    });
  });
}); 