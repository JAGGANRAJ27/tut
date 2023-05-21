import {  Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { notificationProvider, RefineSnackbarProvider,RefineThemes,ErrorComponent,ThemedLayoutV2 } from "@refinedev/mui";

import { CssBaseline, GlobalStyles,ThemeProvider } from "@mui/material";
import routerBindings, {
  UnsavedChangesNotifier,NavigateToResource
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes ,Outlet} from "react-router-dom";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {MuiInferencer} from "@refinedev/inferencer/mui"

const App: React.FC = () => {
  return (
      <ThemeProvider theme={RefineThemes.Blue}>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
              <BrowserRouter>
                  <Refine
                      routerProvider={routerBindings}
                      dataProvider={dataProvider(
                          "https://api.fake-rest.refine.dev",
                      )}
                      notificationProvider={notificationProvider}
                      resources={[
                          {
                              name: "blog_posts",
                              list: "/blog-posts",
                              show: "/blog-posts/show/:id",
                              create: "/blog-posts/create",
                              edit: "/blog-posts/edit/:id",
                          },
                      ]}
                      options={{
                          syncWithLocation: true,
                          warnWhenUnsavedChanges: true,
                      }}
                  >
                      <Routes>
                          <Route
                              element={
                                  <ThemedLayoutV2>
                                      <Outlet />
                                  </ThemedLayoutV2>
                              }
                          >
                              <Route
                                  index
                                  element={
                                      <NavigateToResource resource="blog_posts" />
                                  }
                              />
                              <Route path="blog-posts">
                                  <Route index element={<MuiInferencer />} />
                                  <Route
                                      path="show/:id"
                                      element={<MuiInferencer />}
                                  />
                                  <Route
                                      path="edit/:id"
                                      element={<MuiInferencer />}
                                  />
                                  <Route
                                      path="create"
                                      element={<MuiInferencer />}
                                  />
                              </Route>
                              <Route path="*" element={<ErrorComponent />} />
                          </Route>
                      </Routes>
                      <UnsavedChangesNotifier />
                  </Refine>
              </BrowserRouter>
          </RefineSnackbarProvider>
      </ThemeProvider>
  );
};

export default App;
