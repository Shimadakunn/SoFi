# SoFiLend 🌱

![Banner](assets/banner.png)

## Short Description

SoFiLend is an DeFi overcollateralised lending protocol using on-chain social profiles (Lens, ENS, etc.) as collateral for borrowing assets.

Our appplication uses smart analytics to monitor blockchain activity, generating a reputation score for each user with an advanced social graph system. Depending on the reputation score obtained by the user, he is eligible to borrow an amount of assets. 

> This project has been built during ETH Global Istanbul 2023 Hackathon. More information [here](https://ethglobal.com/events/istanbul).

- Try the application for yourself here 👉 [Website](https://www.youtube.com/)
- Watch the demo video here 👉 [video](https://www.youtube.com/)

## Problem

Current undercollateralized lending protocols struggle with effectiveness due to inadequate incentives for borrowers to ensure loan repayment. The rise of the creator economy and social finance initiatives, including on-chain social media and profiles like those offered by the Lens Protocol, signal a shift towards leveraging digital identity and reputation as potential solutions to this challenge.

## How does it work ?

### Collateral Deposits: Social profiles

Your Lens or ENS profiles are not just digital identities; they are tokens with inherent value based on your reputation within the ecosystem. 

### Features?

- **Continued Access**: Even after depositing your Lens or ENS profiles as collateral, you maintain full access to these accounts.
- **Repayment Notifications**: As the loan repayment date nears, you'll receive push notifications about your health factor and potential liquidation risks.
- **Reclaiming Collateral**: Once you repay the loan, your deposited collateral is returned to you.

### Consequences of Non-Payment

Failure to repay the loan triggers a soft ban, imposing the following restrictions:

- **Lens**: Blocks all interactions on the platform.
- **ENS**: Funds due to you are frozen in an escrow account, which then directs the funds to the lender.
- **Vouching Limit**: Restricts vouching capabilities (up to a maximum of 2 per wallet).


## Technologies Used

SoFiLend leverages the technologies of the following sponsors:

**Lens Protocol 🌿**

We have leveraged lens profiles and their on-chain interaction to efficiently value the credit score of the users.

**Aave 👻**

We have leveraged Aave V3 Lending & Borrowing technology stack to allow our users to efficiently borrow assets with their on-chain profiles.

**Spark** 

Similarly to Aave, we also leverage Spark lending & borrowing functionalities for our application.

**WalletConnect**

**Push Protocol**
    
## Application Architecture

Image <Here>

