using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SiteProvisioning.SampleSite.Services
{
    public class SampleService
    {
        public SampleService()
        {

        }

        public string AssetDirectory { get; set; }

        public void DoSomething()
        {
            //Wait 3 seconds
            System.Threading.Thread.Sleep(3000);
        }

        public string DoSomethingWithTitle(string title)
        {
            //Wait 2 seconds
            System.Threading.Thread.Sleep(2000);

            //Return title
            return title;
        }
    }
}
