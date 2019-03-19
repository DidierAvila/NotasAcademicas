using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotasAcademicasNegocio.Utility
{
    public class Utility
    {
        
    }

    public class PLogin
    {
        public int IdCurrentUser { get; set; }
        public string CurrentUser { get; set; }
        public string CurrentUserType { get; set; }
    }

    public class PProfile
    {
        public int IdStuden{ get; set; }
        public string UserName { get; set; }
        public string LastName { get; set; }
        public string Document { get; set; }
        public string DocumentType { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime Birthdate { get; set; }
        public string Nationality { get; set; }
        public string Career { get; set; }
        public string CurrentLevel { get; set; }
        public double GeneralAverage { get; set; }
        public DateTime AdmissionDate { get; set; }
        public string Headquarters { get; set; }
        public string Password { get; set; }
    }

    public class PProfileTeacher
    {
        public int IdCurrentUser { get; set; }
        public string CurrentUser { get; set; }
    }
}
