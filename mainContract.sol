// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/IERC1155.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract LoanContract is ERC1155Holder {
    address public owner;
    IERC20 public collateralToken;
    IERC1155 public collateralLens;
    uint256 public interestRate;

    enum LoanStatus {
        Undefined,
        Open,
        Repaid,
        SoftDefaulted,
        Defaulted
    }

    struct Loan {
        uint256 loanAmount;
        uint256 collateralLensId;
        LoanStatus status;
    }

    mapping(address => Loan) public loans;
    uint256 public loanCounter;

    event LoanCreated(address indexed borrower, uint256 loanAmount);
    event LoanRepaid(address indexed borrower, uint256 loanAmount);
    event LoanSoftDefaulted(address indexed borrower, uint256 loanAmount);
    event LoanDefaulted(address indexed borrower, uint256 loanAmount);

    constructor(uint256 _interestRate) {
        owner = msg.sender;
        collateralToken = IERC20(
            address(0xc8c0Cf9436F4862a8F60Ce680Ca5a9f0f99b5ded)
        ); // Token Address (DAI)
        collateralLens = IERC1155(
            address(0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d)
        ); // Lens Protocol Address
        interestRate = _interestRate;
    }

    function getLoanStatus(address borrower)
        external
        view
        returns (LoanStatus)
    {
        return loans[borrower].status;
    }

    function getLoanAmount(address borrower) external view returns (uint256) {
        return loans[borrower].loanAmount;
    }

    function getCollateralLensId(address borrower)
        external
        view
        returns (uint256)
    {
        return loans[borrower].collateralLensId;
    }

    function getAllowedCredit(
        uint256 collateralTokenId // to define
    ) external pure returns (uint256) {
        return collateralTokenId + 1;
    }

    function createLoan(uint256 _loanAmount, uint256 _collateralLensId)
        external
    {
        require(_loanAmount > 0, "Loan amount must be greater than zero");
        /*require(
            _loanAmount <= this.getAllowedCredit(_collateralLensId),
            "Loan amount must be greater than zero"
        );*/
        require(
            loans[msg.sender].status != LoanStatus.Open,
            "Loan is already open"
        );

        loans[msg.sender] = Loan({
            loanAmount: _loanAmount,
            collateralLensId: _collateralLensId,
            status: LoanStatus.Open
        });

        /*collateralLens.safeTransferFrom(
            msg.sender,
            address(this),
            _collateralLensId,
            _loanAmount,
            ""
        );*/

        collateralToken.approve(msg.sender, _loanAmount);
        collateralToken.transfer(msg.sender, _loanAmount);

        loanCounter++;

        loans[msg.sender].status = LoanStatus.Open;

        emit LoanCreated(msg.sender, _loanAmount);
    }

    function repayLoan() external payable {
        Loan storage loan = loans[msg.sender];
        require(loan.status == LoanStatus.Open, "Loan is not open");

        require(
            collateralToken.transferFrom(msg.sender, address(this), loan.loanAmount),
            "Repayment transfer failed"
        );

        /*collateralLens.safeTransferFrom(
            address(this),
            msg.sender,
            loan.collateralLensId,
            loan.loanAmount,
            ""
        );*/

        loan.status = LoanStatus.Repaid;

        emit LoanRepaid(msg.sender, loan.loanAmount);

        delete loans[msg.sender];
    }

    function declareSoftDefault(address borrower) external {
        Loan storage loan = loans[borrower];
        require(loan.status == LoanStatus.Open, "Loan is not open");
        require(msg.sender == owner, "Only the owner can declare soft default");

        loan.status = LoanStatus.SoftDefaulted;

        emit LoanSoftDefaulted(borrower, loan.loanAmount);
    }

    function declareDefault(address borrower) external {
        Loan storage loan = loans[borrower];
        require(loan.status == LoanStatus.Open, "Loan is not open");
        require(msg.sender == owner, "Only the owner can declare default");

        loan.status = LoanStatus.Defaulted;

        emit LoanDefaulted(borrower, loan.loanAmount);
    }

    function redeemCollat(uint256 collateralLensId) external view {
        // need to delete view
        require(
            loans[msg.sender].status != LoanStatus.Open,
            "There is an open loan"
        );
        require(
            loans[msg.sender].status != LoanStatus.Defaulted,
            "There is a defaulted loan"
        );

        /*collateralLens.safeTransferFrom(
            address(this),
            owner,
            collateralLensId,
            loans[msg.sender].loanAmount,
            ""
        );*/
    }

    function softLiquid() external {
        Loan storage loan = loans[msg.sender];
        //require(loan.status == LoanStatus.SoftDefaulted, "Loan is not soft defaulted");

        /*collateralLens.safeTransferFrom(
            address(this),
            owner,
            loan.collateralLensId,
            loan.loanAmount,
            ""
        );*/

        //event declare

        delete loans[msg.sender];
    }

    function hardLiquid() external {
        Loan storage loan = loans[msg.sender];
        require(loan.status == LoanStatus.Defaulted, "Loan is not defaulted");

        /*collateralLens.safeTransferFrom(
            address(this),
            owner,
            loan.collateralLensId,
            loan.loanAmount,
            ""
        );*/

        delete loans[msg.sender];
    }
}
