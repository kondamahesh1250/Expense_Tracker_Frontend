import axios from 'axios';
import { useEffect, useState } from 'react'
import Piecharts from './Piecharts';
import { useNavigate } from 'react-router-dom';

const Expense_Track = () => {
  const [expense, setExpense] = useState([]);
  const [balance, setBalance] = useState(0);
  const [userData, setUserData] = useState({
    amount: '',
    category: '',
    description: '',
    date: ''
  });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login");
    }
    expenseTrack();
  }, [])

  const expenseTrack = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/expenses`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (data) {
        setExpense(data);

        let totalIncome = 0;
        let totalExpense = 0;

        data.forEach(item => {
          if (item.category === 'income') {
            totalIncome += Number(item.amount);
          } else {
            totalExpense += Number(item.amount);
          }
        });

        let total = totalIncome - totalExpense;
        setBalance(total);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${apiUrl}/api/expenses`, userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (data) {
        setUserData({
          amount: '',
          category: '',
          description: '',
          date: ''
        });
        expenseTrack();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleModify = (item) => {
    setUserData(item);
  }

  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(`${apiUrl}/api/expenses/${userData._id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (data) {
        expenseTrack();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`${apiUrl}/api/expenses/${userData._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (data) {
        expenseTrack();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container-fluid my-0 bg-light p-4 rounded-3 min-vh-100 ">
      <div className="row">
        <div className="col-md-6 col-lg-6 mt-5">
          <h3 className='text-center'>Total Balance: <span>₹</span>{balance}</h3>

          <form onSubmit={handleSubmit} className='p-4'>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Amount</label>
              <input type="number" name="amount" id="amount" className="form-control" value={userData.amount} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <select name="category" id="category" className="form-select" value={userData.category} onChange={handleChange}>
                <option value="select">Select</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input type="text" name="description" id="description" className="form-control" value={userData.description} onChange={handleChange} />
            </div>

            <div className="mb-5">
              <label htmlFor="date" className="form-label">Date</label>
              <input type="date" name="date" id="date" className="form-control" value={userData.date} onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn-primary w-100">Add Data</button>
          </form>
        </div>

        {/* PieCharts Section */}
        <div className="col-md-6 col-lg-6 chart">
          <Piecharts expenses={expense} />
        </div>
      </div>

      {/* Expense Table */}
      {expense.length > 0 ? (
        <div className="table-responsive mt-5">
          <table className="table table-bordered">
            <thead className="table-light text-center">
              <tr>
                <th>S.No</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Category</th>
                <th>Date</th>
                <th className=' text-center' colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {expense.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.amount}</td>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                  <td>{item.date}</td>
                  <td className=' text-center'>
                    <button onClick={() => { handleModify(item) }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                  </td>
                  <td className=' text-center'>
                    <button onClick={() => { handleModify(item) }} className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal1">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center mt-5">
          <img src="https://cdn-icons-png.flaticon.com/512/7466/7466073.png" alt="No data" className="img-fluid" width={"15%"} />
          <h2>No data Found</h2>
        </div>
      )}

      {/* Edit Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">Amount</label>
                  <input type="number" name="amount" id="amount" className="form-control" onChange={handleChange} value={userData.amount} />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  <select name="category" id="category" className="form-select" onChange={handleChange} value={userData.category}>
                    <option value="select">Select</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" name="description" id="description" className="form-control" onChange={handleChange} value={userData.description} />
                </div>

                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Date</label>
                  <input type="date" name="date" id="date" className="form-control" onChange={handleChange} value={userData.date} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleUpdate}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Delete</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this transaction?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDelete}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expense_Track