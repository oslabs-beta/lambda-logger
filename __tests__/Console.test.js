jest.mock("react-syntax-highlighter", () => {
  const SyntaxHighlighter = ({
    children,
    style,
    language,
    showLineNumbers,
    showInlineLineNumbers,
    lineNumberStyle,
    className,
  }) => {
    const content = Array.isArray(children)
      ? JSON.stringify(children, null, 2)
      : children;

    return (
      <div style={style} className={className}>
        {showLineNumbers && <div style={lineNumberStyle}>Line Numbers</div>}
        <pre>{content}</pre>
      </div>
    );
  };
  return {
    Light: SyntaxHighlighter,
  };
});

jest.mock("react-syntax-highlighter/dist/esm/languages/hljs/json", () => ({}));

import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Console from "../client/components/Console";

describe("<Console />", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(
      <Router>
        <Console jsonObject={[]} theme={mockTheme} searchQuery={""} />
      </Router>
    );
    expect(getByTestId("console-container")).toBeInTheDocument();
  });

  it("displays JSON data correctly", () => {
    const testJson = [{ message: "Test log message" }];
    const { getByText } = render(
      <Router>
        <Console jsonObject={testJson} theme={mockTheme} searchQuery={""} />
      </Router>
    );
    expect(getByText(JSON.stringify(testJson, null, 2))).toBeInTheDocument();
  });
});
