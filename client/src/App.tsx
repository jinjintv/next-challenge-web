import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Layout from "./components/layout/Layout";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
// import AdminPortfolioList from "./pages/admin/PortfolioList";
import PortfolioForm from "./pages/admin/PortfolioForm";
import AdminPortfolioList from "./pages/admin/AdminPortfolioList";
import AdminPortfolioForm from "./pages/admin/AdminPortfolioForm";
import PortfolioDetail from "./pages/portfolio/PortfolioDetail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/portfolio" component={AdminPortfolioList} />
      <Route path="/admin/portfolio/new">
        <AdminPortfolioForm />
      </Route>
     <Route path="/admin/portfolio/:id/edit">
        {params => <AdminPortfolioForm id={params.id} />}
      </Route>
      <Route path="/portfolio/:id" component={PortfolioDetail} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />

          <Layout>
            <Router />
          </Layout>

        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
