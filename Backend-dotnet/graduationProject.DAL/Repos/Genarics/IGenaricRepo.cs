using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace graduationProject.DAL
{
    public interface IGenaricRepo<TEnity> where TEnity : class
    {
/*        List<TEnity> GetAll();*/
        /*TEnity? GetById(string? id);*/
        void Add(TEnity enity);
        int SaveChanges();
    }
}
