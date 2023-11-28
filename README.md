# Lambda-logger
Lambda Logger tackles post-deployment challenges by introducing an intuitive interface for swift log inspection. With JSON format logs and a custom parser for clarity, users gain accessible return values. Ensuring security, the application employs AWS IAM credentials for authentication, diminishing reliance on the sluggish AWS CloudWatch console.
<p align="center">
  <img src="./docs/assets/images/minLogo.png" />
  </p>

## Table of Contents
1. [Features]()
2. [Getting Started Guide]()
3. [Documentation]()
4. [Contributing]()
5. [Contributors]()

## Getting Started Guide
- From [Lambda-logger](https://github.com/oslabs-beta/lambda-logger), fork to your repo, then in the terminal, `git clone 'copied url'`
- How to get access-key and secret-key to log in?
    - From your AWS root account, you should have your own "IAM" user in your AWS account. If you do not have it yet, click [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) to know how to create.
    - After got "IAM user", in your AWS Console, at search bar, search for `IAM`. Go to `Users` tab, then choose your <yourIAMuser> that you just create. In Summary, click `Create access key` --> choose `Local code` --> Check `I understand` box --> click `Next` --> In `Description tag value`, put any name you want to --> click `Create access key`

    - ![](./docs/assets/images/get-access-key.gif)

    - Now you should save `Secret access key` in somewhere(**Note:** this key are very sensitive, do NOT publish), or click on `Download .csv file` before click `Done`. If you forget this step, the "Secret key access" would be gone, unless you create a new one.

    - **Note:** You only can create up to 2 "Access key". If you want to create another one, you must delete the old one.
    - After get keys, get the region 
    ![](./docs/assets/images/region.png)

- Since we have all stuff to log in, on the terminal run `npm run dev`, navigate to http://localhost:8080/ to view web application, and use both keys and region to access.
    ![](./docs/assets/images/homepage.png)

- Nav Bar Overview (Dropdowns, Search, Theme)
![](./docs/assets/images/consolePage.png)
- Select Log group and Log Stream you want to access from your "Lambda function", then you will get content looks like this:
![](./docs/assets/images/consoleContent.png)

## Documentation
- How AWS SDK Is Implemented
- React Syntax Highlighter

## Roadmap
| Feature                                          | Status |
| ------------------------------------------------ | ------ |
| Dynamiccally Fetch Logs and Stream From CloudWatch                                         | ✅     |
| Back-end Testing                                 | ✅     |
| Dark/Light Mode                                  | ✅     |
| Increase Testing Coverage                        | ⏳     |
| Make Stream Content linkable                      | ⚡️      |

- ✅ = Completed
- ⏳ = In-Progress
- ⚡️ = Backlog

## Contributing
- Potential iteration ideas
- What needs to be improved (feature-wise)
- Adding more themes
- Improving search
- What needs to be improved (code-wise)
- Add additional front end tests
- Add additional back end tests
- Migrate to AWS SDK 3

## Contributors
• Conrad Preston: [LinkedIn]() | [GitHub](https://github.com/Conrady82)

• Hoang Dang: [LinkedIn]() | [GitHub](https://github.com/hoangdang91768)

• Luke Clarkson: [LinkedIn]() | [GitHub](https://github.com/LClarkson)

• Nick C. Mason: [LinkedIn]() | [GitHub](https://github.com/nickmasonswe)