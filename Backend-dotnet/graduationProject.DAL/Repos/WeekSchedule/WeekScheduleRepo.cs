using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace graduationProject.DAL
{
    public class WeekScheduleRepo : IWeekScheduleRepo
    {
        private readonly HospitalContext _context;

        public WeekScheduleRepo(HospitalContext context)
        {
            _context = context;
        }

        public Doctor? GetAllWeekSchedule(string id)
        {
            return _context.Set<Doctor>().Include(d => d.weeks).FirstOrDefault(d=>d.Id == id);

        }
    }
}