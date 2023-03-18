import React,{useState,useEffect} from 'react'
import {useNavigate,useParams, Link} from 'react-router-dom';
import CustomerService from '../services/CustomerService'

const AddCustomerComponent = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailId, setEmailId] = useState('') 
  const navigate = useNavigate();
  const {id} = useParams();

  const saveOrUpdateCustomer = (e) => {
    e.preventDefault();

    const customer = {firstName,lastName,emailId}

    if(id){
        CustomerService.updateCustomer(id,customer).then((response) =>{
            navigate('/customers')
        }).catch(error => {
            console.log(error);
        })

    }else{
        CustomerService.createCustomer(customer).then((response) =>{
            console.log(response.data)
    
            navigate('/customers')
    
        }).catch(error => {
            console.log(error)
        })
        
    }

  }

  useEffect(() => {
    CustomerService.getCustomerById(id).then((response) =>{
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmailId(response.data.emailId)
    }).catch(error => {
        console.log(error)
    })
  }, [])

  const title = () => {
    if(id){
        return <h2 className='text-center'>Update Customer</h2>
    }else{
        return <h2 className='text-center'>Add Customer</h2>
    }
  }

  return (
    <div>
        <br /><br />
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        title()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name</label>
                                <input 
                                    type="text" 
                                    placeholder='Enter first name' 
                                    name='firstName' 
                                    className='form-control' 
                                    value={firstName} 
                                    onChange = {(e) => setFirstName(e.target.value)} 
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name</label>
                                <input 
                                    type="text" 
                                    placeholder='Enter last name' 
                                    name='lastName' 
                                    className='form-control' 
                                    value={lastName} 
                                    onChange = {(e) => setLastName(e.target.value)} 
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Email Id</label>
                                <input 
                                    type="text" 
                                    placeholder='Enter email Id' 
                                    name='emaiId' 
                                    className='form-control' 
                                    value={emailId} 
                                    onChange = {(e) => setEmailId(e.target.value)} 
                                />
                            </div>

                            <button className='btn btn-success' onClick={(e) => saveOrUpdateCustomer(e)}> Submit </button>
                            <Link to="/customers" className="btn btn-danger">Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddCustomerComponent
