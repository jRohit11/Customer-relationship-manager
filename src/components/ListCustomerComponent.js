import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import CustomerService from '../services/CustomerService'

const ListCustomerComponent = () => {

  const [customers, setCustomers] = useState([])

  const getAllCustomers = () => {
    CustomerService.getAllCustomers().then((response)=>{
        setCustomers(response.data)
        console.log(response.data);
    }).catch(error =>{
        console.log(error);
    })
  }
  useEffect(() => {
    getAllCustomers();
  }, [])

  const deleteCustomer = (customerId) => {
    CustomerService.deleteCustomer(customerId).then((response)=>{
        getAllCustomers();
    }).catch(error =>{
        console.log(error);
    })
  }

  return (
    <div className='container'>
        <h2 className='text-center'>Customers List</h2>
        <Link to="/add-customer" className="btn btn-primary mb-2">Add Customer</Link>
        <table className='table table-bordered table-striped'>
            <thead>
                <th>Customer Id</th>
                <th>Customer First Name</th>
                <th>Customer Last Name</th>
                <th>Customer Email Id</th>
                <th>Actions</th>
            </thead>
            <tbody>
                {
                    customers.map(
                        customer =>
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.firstName}</td>
                            <td>{customer.lastName}</td>
                            <td>{customer.emailId}</td>
                            <td>
                                <Link className='btn btn-info' to={`/edit-customer/${customer.id}`}>Update</Link>
                                <button className='btn btn-danger' onClick={() => deleteCustomer(customer.id)}
                                style = {{marginLeft:"10px"}}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>

    </div>
  )
}

export default ListCustomerComponent