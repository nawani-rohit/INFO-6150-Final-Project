import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/post"
            element={
              <ProtectedRoute>
                <PostAd />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/activate/:token"
            element={
              <PublicRoute>
                <ActivateAccount />
              </PublicRoute>
            }
          />
          <Route
            path="/change-password/:token"
            element={
              <PublicRoute>
                <ChangePassword />
              </PublicRoute>
            }
          />
          <Route
            path="/find-account"
            element={
              <PublicRoute>
                <FindAccount />
              </PublicRoute>
            }
          />
          <Route
            path="/myads"
            element={
              <ProtectedRoute>
                <MyAds />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update/item/:id"
            element={
              <ProtectedRoute>
                <UpdateAd />
              </ProtectedRoute>
            }
          />
          <Route path="/item/:id" element={<Ad />} />
        </Routes>
        <Footer />
      </Router>

      <Toaster />
    </div>
  );
}

export default App;
