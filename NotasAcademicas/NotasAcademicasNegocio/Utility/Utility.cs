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
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Birthdate { get; set; }
        public string Nationality { get; set; }
        public string Career { get; set; }
        public string CurrentLevel { get; set; }
        public double GeneralAverage { get; set; }
        public string AdmissionDate { get; set; }
        public string Headquarters { get; set; }
        public string Password { get; set; }
        public string LevelEducation { get; set; }
        public string EducationDegree { get; set; }
    }

    public class PCMatter
    {
        public string IdMatter { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Dependence { get; set; }
        public string Modality { get; set; }
        public string Status { get; set; }
        public string Prerequisites { get; set; }
        public int Level { get; set; }
        public int NamberCredits { get; set; }
    }

    public class PCurrentMatterView
    {
        public string IdMatter { get; set; }
        public string NameMatter { get; set; }
        public string Code { get; set; }
        public int NamberCredits { get; set; }
        public string IdTeacher { get; set; }
        public string NameTeacher { get; set; }
    }

}
