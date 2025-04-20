import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";

import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/globals";
import { CycleProvider } from "./providers/CycleProvider";

export function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<BrowserRouter>
				<CycleProvider>
					<Router />
				</CycleProvider>
			</BrowserRouter>
			<GlobalStyle />
		</ThemeProvider>
	);
}
