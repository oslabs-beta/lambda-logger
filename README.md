# Lambda-logger
<p align="left">
  <img src="./docs/assets/images/minLogo.png" width="15%" />
</p>
Lambda Logger tackles post-lambda-deployment challenges by introducing an intuitive interface for swift log inspection. With JSON format logs and a custom parser for clarity, users gain accessible value. Ensuring security, the application employs AWS IAM credentials for authentication, diminishing reliance on the sluggish AWS CloudWatch console.

## Table of Contents
1. [Features](#features)
2. [Instructions](#instructions)
3. [Documentation](#documentation)
4. [Open Source Information](#open-source-information)
5. [Contributors](#contributors)

## Features
- Dynamically Fetch Logs From CloudWatch
- Custom Log Interpreter
- Searchable Logs

## Instructions
- Visit https://lambdalogger.dev/, navigate to App, and enter your temporary AWS access credentials.
- From [Lambda-logger](https://github.com/oslabs-beta/lambda-logger), fork to your repo, then in the terminal, `git clone 'copied URL'`
- How can you get your "access key" and "secret key" to log in?
    - From your AWS root account, you should have your own "IAM" user. If you do not have it yet, click [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) to learn how to create it.
    - After getting your "IAM User" credentials, in your AWS Console, at the `search bar`, search for `IAM` and click. Go to the `Users` tab, then choose the IAM user that you just created. In Summary, click `Create access key` --> choose `Local code` --> Check the `I understand` box --> click `Next` --> In `Description tag value`, put any name you want --> click `Create access key`

    - ![](./docs/assets/images/get-access-key.gif)

    - Now you should save your `Secret access key` somewhere (**Note:** This key is very sensitive, do NOT publish), or click on `Download .csv file` before clicking `Done`. If you forget this step, you won't have a chance to view your "Secret key access" again, so you'll have to create a new one.

    - **Note:** You only can create up to "2 Access keys" at a time per user. If you want to create another one, you must delete an old one.
    - After getting the keys, get the region 
    ![](./docs/assets/images/region.png)

- Now that we have our credentials, in the terminal, run `npm install`, then `npm run dev`. Navigate to http://localhost:8080 to view the web application, navigate to the App page, and enter your credentials and region to access your Lambda Logs.
    ![](./docs/assets/images/homepage.png)

- Nav Bar Overview (Dropdowns, Search, Theme)
![](./docs/assets/images/consolePage.png)
- Select a Lambda Function Log group and Log Stream to view, then you'll get content that looks like this:
![](./docs/assets/images/consoleContent.png)

## Documentation
- Full documentation available [here](https://github.com/oslabs-beta/lambda-logger/blob/main/Documentation.md)
- How is the AWS SDK Implemented?
    - A software development kit (SDK) is a set of platform-specific building tools for developers. Developers require components like debuggers, compilers, and libraries to create code that runs on a specific platform, operating system, or programming language. SDKs put everything you need to develop and run software in one place. Additionally, they contain resources like documentation, tutorials, and guides as well as APIs and frameworks for faster application development.
    - Lambda Logger uses the AWS SDK for JavaScript v3 API Reference Guide which provides a JavaScript API for AWS services. This project uses the AWS-SDK to fetch data from CloudWatch.
    - For more info, click [here](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html).

- React Syntax Highlighter
    - Syntax highlighting component for `React`` using the seriously super amazing [lowlight](https://github.com/wooorm/lowlight) and [refractor](https://github.com/wooorm/refractor) by [wooorm](https://github.com/wooorm).
    - Click [here](https://www.npmjs.com/package/react-syntax-highlighter) for more information.

## Open Source Information
### Testing
- Before running tests, if the server is currently running (after running `npm run dev`), exit the server (keyboard command "Control + C" or "Command + C).
- **Note:** To ensure the server shuts down, double check by running `lsof -i:3000` in the terminal. If the server is still running, you'll see its "PID" in the terminal, and you'll have to kill it (`kill -9 <PID>`) before testing.
    - Run `npm run test` to test the whole app.
    - Run `npm run test <filename.js>` to test only that specific file.
### Roadmap
| Feature                                          | Status |
| ------------------------------------------------ | ------ |
| Dynamically Fetch Logs From CloudWatch           | ✅     |
| Back-end Testing                                 | ✅     |
| Dark/Light Mode                                  | ✅     |
| Increase Testing Coverage                        | ⏳     |
| Make Stream Content Linkable/Shareable           | ⚡️      |
| Add More Themes!                                 | ⚡️      |
| Improve Search Functionality                     | ⚡️      |

- ✅ = Completed
- ⏳ = In-Progress
- ⚡️ = Backlog

### Contributing
- Potential iteration ideas
  - Anything from the backlog
  - Add additional front-end tests
  - Add additional back-end tests
  - Migrate to AWS SDK 3

## Contributors

<table>
  <tr>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/128096173?v=4" width="140px;" alt=""/>
      <br />
        <sub><b>Conrad Preston</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/conrad-preston-aaaa9b252/">🖇️</a>
      <a href="https://github.com/Conrady82">🐙</a>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/144387822?s=400&u=8cb84bdf130e87fef7cb92283af412d82594be20&v=4" width="140px;" alt=""/>
      <br />
        <sub><b>Hoang Dang</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/hoang-dang-b884b4296/">🖇️</a>
      <a href="https://github.com/hoangdang91768">🐙</a>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/53544649?v=4" width="140px;" alt=""/>
      <br />
        <sub><b>Luke Clarkson</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/ljclarkson/">🖇️</a>
      <a href="https://github.com/LClarkson">🐙</a>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/138337584?v=4" width="140px;" alt=""/>
      <br />
        <sub><b>Nick C. Mason</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/nickmasonswe/">🖇️</a>
      <a href="https://github.com/nickmasonswe">🐙</a>
    </td>
  </tr>
</table>

- 🖇️ = LinkedIn
- 🐙 = Github
