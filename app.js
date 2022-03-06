const express = require("express");
const bodyParser  = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/showroomdb",{ useNewUrlParser: true ,useUnifiedTopology: true });

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

//---------------------------------------------------------------------------------

app.get("/home",function (req,res) {
    res.render('home');
})

//--------------------------------------------------------------------------------

app.get("/Review",function (req,res) {
    res.render('Review');
})

//---------- customer-data----------------------------------------------------
const CustomerSchema = new mongoose.Schema({
   Customer_No : Number,
   Customer_Name : String,
   Address : String,
    Email : String,
    Date : {type: Date, default: Date.now},
    Bike : String,
    Description : String
 });

 const customers = mongoose.model('Customer', CustomerSchema);

app.post("/add-customer-data", function (req,res){
    
    const customer = new customers({
        Customer_No : req.body.No,
        Customer_Name : req.body.myName,
        Address : req.body.myaddress,
        Email : req.body.myEmail,
        Date : req.body.myDate,
        Bike : req.body.Bike,
        Description : req.body.myText
    })    
    const customered =  customer.save();
  console.log("Data is Sucessfully Saved....!");
    res.status(201).render("home");
})


//---------------------------------------------------------------------



app.get("/add-customer-data",function (req,res) {
    res.render('add-customer-data');
})


//-------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------

app.post("/show-customer-data",function (req,res) {
    var inputName = req.body.input_name;

  customers.findOne( {Customer_Name : inputName },function (err,customers) {
     if (err) {
         console.log("Error: Unable to fetch customer data..");
     }else{
         res.render('show-customer-data', {
                    data : customers
                   } );
       
     }
   })

})

//----------------------------------------------------------------------
app.get("/show-customer-data",function (req,res) {
   res.render('show-customer-data',{ data : customers});
})

//--------------------------------------------------------------------------------------------

app.get("/List-of-Customer",function (req,res) {

    customers.find( {},function (err,customers) {
        if (err) {
            console.log("Error: Unable to fetch customer data..");
        }else{
            res.render('List-of-Customer', {
                      data : customers
                      } );
        }
});
    });    

    


//---------- Employee-data----------------------------------------------------
const EmployeeSchema = new mongoose.Schema({
    Employee_id : Number,
    Employee_Name : String,
    Address : String,
     Email : String,
     Date_of_Joining : {type: Date, default: Date.now},
     Salary : Number,
     Description : String
  });
 
  const employees = mongoose.model('employee', EmployeeSchema);
 
 app.post("/Add-Employee", function (req,res){
     
     const employee = new employees({
         Employee_id : req.body.No,
         Employee_Name : req.body.myName,
         Address : req.body.myaddress,
         Email : req.body.myEmail,
         Date_of_Joining : req.body.myDate,
         Salary : req.body.Salary,
         Description : req.body.myText
     })    
     const emp =  employee.save();
   console.log("Data is Sucessfully Saved....!");
     res.status(201).render("home");
 })
 
 
 //---------------------------------------------------------------------
 
 
 
 app.get("/Add-Employee",function (req,res) {
     res.render('Add-Employee');
 })
 
 
 //-------------------------------------------------------------------------------------------------
 
 //----------------------------------------------------------------------------------------------------
 
 app.post("/Show-Employee",function (req,res) {
     var inputName = req.body.Emp_name;
 
  employees.findOne( {Employee_Name : inputName },function (err,employees) {
      if (err) {
          console.log("Error: Unable to fetch customer data..");
      }else{
          res.render('Show-Employee', {
                     data : employees
                    } );
        
      }
    })
 
 })
 
 //----------------------------------------------------------------------
 app.get("/Show-Employee",function (req,res) {
    res.render('Show-Employee',{ data : employees});
 })
 
 //--------------------------------------------------------------------------------------------
 
 app.get("/List-of-Employee",function (req,res) {
 
     employees.find( {},function (err,employees) {
         if (err) {
             console.log("Error: Unable to fetch customer data..");
         }else{
             res.render('List-of-Employee', {
                       data : employees
                       } );
         }
 });
     });    
 

//----------------------------Quatation--------------------------------------------------------------

app.get("/Add-Quatation",function (req,res) {
    res.render('Add-Quatation');
})

const QuatationSchema = new mongoose.Schema({
       Bike_id : Number,
      Bike_Name : String,
     Price : Number,
     No_of_cylinder : Number,
     Bike_colors : String,
     fuel_capacity : Number,
     engine_type : String,
     ground_clearance : Number,
     braking : String
  });
 
  const Quatations = mongoose.model('Quatation', QuatationSchema);

app.post("/Add-Quatation",function (req,res) {
    const Quatation  = new  Quatations({

        Bike_id : req.body.id,
        Bike_Name :  req.body.Bike_Name,
        Price :  req.body.Price,
        No_of_cylinder :  req.body.No_of_cylinder,
        Bike_colors :  req.body.Bike_colors,
        fuel_capacity :  req.body.fuel_capacity,
        engine_type :  req.body.engine_type,
        ground_clearance :  req.body.ground_clearance,
        braking :  req.body.braking
    });
     var Qua = Quatation.save();
  console.log("Data is Sucessfully Saved....!");
  res.render('home');
})
//--------------------------------------------------------------------------
app.post("/show-Quatation",function (req,res) {
    var inputName = "royal-enfield-"+req.body.B_name;    
 console.log(inputName);
  Quatations.findOne( {Bike_Name : inputName },function (err,Quatations) {
     if (err) {
         console.log("Error: Unable to fetch customer data..");
     }else{
         res.render('show-Quatation', {
                    data : Quatations
                   } );
                   console.log(Quatations);
     }
   })

})

//----------------------------------------------------------------------
app.get("/show-Quatation",function (req,res) {
   res.render('show-Quatation',{ data : Quatations});
})

//------------------------------------------------------------------------------


//---------- Supplier-data----------------------------------------------------
const SupplierSchema = new mongoose.Schema({
    Supplier_id : Number,
    Supplier_Name : String,
    Address : String,
     Email : String,
     Contact : Number,
     Date_of_Supply : {type: Date, default: Date.now},
     Bike_Supply : String
  });
 
  const Suppliers = mongoose.model('supplier', SupplierSchema);
 
 app.post("/Add-Supplier", function (req,res){
     
     const Supplier = new Suppliers({
         Supplier_id : req.body.No,
         Supplier_Name : req.body.myName,
         Address : req.body.myaddress,
         Email : req.body.myEmail,
         Contact : req.body.contact,
         Date_of_Supply : req.body.myDate,
         Bike_Supply : req.body.Bike_Supply
     })    
     const supp =  Supplier.save();
   console.log("Data is Sucessfully Saved....!");
     res.status(201).render("home");
 })
 
 
 //---------------------------------------------------------------------
 
 
 
 app.get("/Add-Supplier",function (req,res) {
     res.render('Add-Supplier');
 })
 
 
 //----------------------------------------------------------------------------------------------------
 
 app.post("/Show-Supplier",function (req,res) {
     var inputName = req.body.Supp_name;
 
  Suppliers.findOne( {Supplier_Name : inputName },function (err,Suppliers) {
      if (err) {
          console.log("Error: Unable to fetch customer data..");
      }else{
          res.render('Show-Supplier', {
                     data : Suppliers
                    } );
        
      }
    })
 
 })
 
 //----------------------------------------------------------------------
 app.get("/Show-Supplier",function (req,res) {
    res.render('Show-Supplier',{ data : Suppliers});
 })
 
 //--------------------------------------------------------------------------------------------
 

//---------- Purchase-data----------------------------------------------------
const PurchaseSchema = new mongoose.Schema({
    Purchase_id : Number,
     Date_of_Purchase : {type: Date, default: Date.now},
     Supplier_Name : {
        type:String
     },
    Bike_Name : String,
    Bike_Quantity : Number,
  });
 
  const Purchases = mongoose.model('Purchase', PurchaseSchema);
 
 app.post("/Add-Purchase", function (req,res){
     
     const Purchase = new Purchases({
         Purchase_id : req.body.No,
         Date_of_Purchase : req.body.myDate,
         Supplier_Name : req.body.myName,
         Bike_Name : req.body.Bike_Name,
         Bike_Quantity : req.body.Bike_Quantity
     })    
     const Pur =  Purchase.save();
   console.log("Data is Sucessfully Saved....!");
     res.status(201).render("home");
 })
 
 
 //---------------------------------------------------------------------
 
 
 
 app.get("/Add-Purchase",function (req,res) {
     res.render('Add-Purchase');
 })
 
 
 //----------------------------------------------------------------------------------------------------
 
 app.post("/Show-Purchase",function (req,res) {
     var inputName = req.body.Supp_name;
 
  Purchases.findOne( {Purchase_id : inputName },function (err,Purchases) {
      if (err) {
          console.log("Error: Unable to fetch customer data..");
      }else{
          res.render('Show-Purchase', {
                     data : Purchases
                    } );
        
      }
    })
 
 })
 
 //----------------------------------------------------------------------
 app.get("/Show-Purchase",function (req,res) {
    res.render('Show-Purchase',{ data : Purchases});
 })
 
 //--------------------------------------------------------------------------------------------
 
 
//---------- Sales-data----------------------------------------------------
const SalesSchema = new mongoose.Schema({
   Sales_id : Number,
   Sales_Date : {type: Date, default: Date.now},
    Customer_No : Number,
    Price: Number,
    Bike_id :Number,
    Bike_Name :String,
     No_of_Bikes : Number,
     Payment_Mode : String
  });
 
  const Sales = mongoose.model('Sale', SalesSchema);
 
 app.post("/Add-Sales", function (req,res){
     
     const Sale = new Sales({
         Sales_id : req.body.No,
         Sales_Date : req.body.myDate,
         Customer_No : req.body.Customer_No,
         Price : req.body.Price,
         Bike_id : req.body.Bike_id,
         Bike_Name : req.body.Bike_Name,
         No_of_Bike : req.body.No_of_Bike,
         Payment_Mode : req.body.Payment_Mode
     })    
     const sal =  Sale.save();
   console.log("Data is Sucessfully Saved....!");
     res.status(201).render("home");
 })
 
 
 //---------------------------------------------------------------------
 
 
 
 app.get("/Add-Sales",function (req,res) {
     res.render('Add-Sales');
 })
 
 
 //----------------------------------------------------------------------------------------------------
 
 app.post("/Show-Sales",function (req,res) {
     var inputid = req.body.Sales_id;
 
  Sales.findOne( {Sales_id : inputid },function (err,Sales) {
      if (err) {
          console.log("Error: Unable to fetch customer data..");
      }else{
          res.render('Show-Sales', {
                     data : Sales
                    } );
        
      }
    })
 
 })
 
 //----------------------------------------------------------------------
 app.get("/Show-Sales",function (req,res) {
    res.render('Show-Sales',{ data : Sales});
 })
 
 //--------------------------------------------------------------------------------------------
 

//----------------------Sign-in-----------------------------------------------
app.post("/sign-in",function (req,res) {

    var Email = "Admin@gmail.com";
    var constPass = "Admin";
   
   var mail = req.body.email;
    var pass = req.body.password;
   
   if (Email === mail || constPass === pass) {
        res.render('home');
    }else{
        console.log("Wrong Password..");
    }
})


//-------------------------------------------------------------------------------------------------

app.get("/",function (req,res) {
    res.render('sign-in');
      
})

//-----------------------------------------------------------------------------------------------------



app.listen(2020,function () {
    console.log("Server start on port 2020");
});

//--------------------------------------------------------------------------------------------------------