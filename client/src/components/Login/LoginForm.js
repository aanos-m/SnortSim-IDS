import React from 'react'
import { Formik } from "formik";
import * as Yup from "yup";

const LoginForm = () => {

    const loginFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        password: Yup.string().required().min(8, 'Your password has to be atleast 8 characters')
    })

    // const onLogin = async (email, password) => {
    //     try{
    //         await firebase.auth().signInWithEmailAndPassword(email, password)
    //         console.log('firebase login succesful', email, password)
    //     } catch (error) {
    //         Alert.alert(error.message)
    //     }
    // }
    
    return (
        <Formik 
            validationSchema={loginFormSchema}
            initialValues={ { email: "", password: "" }}
            onSubmit={(values) => alert(JSON.stringify(values))}
                //  onLogin(values.email, values.password)}
        >
            {( {handleBlur, handleChange, handleSubmit, values, errors, isValid, touched} ) => (
                <div style={{
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
                    padding: '4px', margin: '4px',
                    //  backgroundColor: 'blue'
                }}>
                    {/* Passing handleSubmit parameter to html form onSubmit property */}
                    <form noValidate onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16}}>
                        <input
                            type='email'
                            name='email'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder="Enter Email"
                            className="form-control inp_text"
                            id="email"
                            style={{display: 'flex',
                                padding: '10px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '10px',
                                alignSelf: 'stretch',
                                color: '#000',
                                fontFamily: 'Roboto',
                                fontSize: '20px',
                                borderRadius: 20,
                                border: 'none',
                                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
                            }}
                        />
                        {/* If validation is not passed show errors */}

                        {/* <p className="error">
                            {errors.email && touched.email && errors.email}
                        </p> */}

                        {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder="Enter password"
                            className="form-control"
                            style={{display: 'flex',
                                padding: '10px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '10px',
                                alignSelf: 'stretch',
                                color: '#000',
                                fontFamily: 'Roboto',
                                fontSize: '20px',
                                borderRadius: 20,
                                border: 'none',
                                stroke: 'none',
                                outline: 'none',
                                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', 
                                borderColor:  1 > values.password.length || values.password.length >= 6 ? 'blue' : 'red'
                            }}
                        />
                        <style> 
                            {` 
                                ::placeholder { 
                                    color: '#9a9a9a'; 
                                }` 
                            } 
                        </style> 
                        {/* If validation is not passed show errors */}

                        {/* <p className="error">
                            {errors.password }
                        </p> */}

                        {/* Click on submit button to submit the form */}
                        <button type="submit"  onClick={() => console.log('login ')}
                            style={{ backgroundColor:'#00D816', color: 'white', justifyContent: 'center', alignItems: 'center', height: '30px',
                            borderRadius: 20, fontSize: 20, border: 'none', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}>

                            Login
                        </button>
                        <button type="submit"  onClick={() => console.log('acc create ')}
                            style={{ backgroundColor:'#FF0C0C', color: 'white', justifyContent: 'center', alignItems: 'center', height: '30px',
                            borderRadius: 20, fontSize: 20, border: 'none', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}>

                            Create Account
                        </button>
                    </form>
                </div>
            )}
        </Formik>
    )
}

export default LoginForm