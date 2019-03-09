using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Microcolsa.AdmonGastosViajeHTML5.Web.Desktop
{
    public partial class mainMenuAdmin : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
    }

    public class Person
    {
        private string firstName;
        private string lastName;
        private int age;
        private string fullName;

        public string FullName
        {
            get
            {
                return firstName + lastName;
            }
            private set { fullName = value; }
        }

        public int Age
        {
            get { return age; }
            set { age = value; }
        }

        public string LastName
        {
            get { return lastName; }
            set { lastName = value; }
        }

        public string FirstName
        {
            get { return firstName; }
            set { firstName = value; }
        }
    }
}