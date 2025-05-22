import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero text-center text-white d-flex justify-content-center align-items-center"
        style={{
          height: '100vh',
          background: 'url(https://www.streebo.com/wp-content/themes/streebo/images/LangingPage/Expense-Management-Cloud-DXA/Expense-Management-Cloud-DXA-banner.jpg) center center / cover',
        }}
      >
        <div className="container">
          <h1 className="display-4">Welcome to Expense Tracker</h1>
          <p className="lead">
            Track your expenses, manage your budget, and stay on top of your finances with ease.
          </p>
          <Link to="/login" className="btn btn-light btn-lg">
            Get Started
          </Link>
        </div>
      </section>

      {/* Get Started Section */}
      <section id="getStarted" className="text-center py-5">
        <div className="container">
          <h2 className="mb-4">Start Managing Your Finances Today!</h2>
          <p className="lead mb-4">
            Click below to begin your journey with Expense Tracker and take control of your finances.
          </p>
          <Link to="/register" className="btn btn-primary btn-lg">
            Sign Up
          </Link>
          <p className="mt-3">
            Already have an account?{' '}
            <Link to="/login" className="text-primary">
              Login here
            </Link>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 bg-dark text-white">
        <p>&copy; 2025 Expense Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
