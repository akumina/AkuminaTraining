using Akumina.Common.Utilities;
using Akumina.Interchange.Core;
using Akumina.Interchange.Core.Entities.Connector;
using Akumina.Interchange.Core.Interfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Web;
using System.Web.Hosting;

namespace CustomPeopleFetcher
{
    public class CustomPeopleFetcher : IPeopleDirectoryUserFetcher
    {
        IConnectorService ConnectorServiceInstance;
        IPeopleDirectoryUserStorageHandler Storage;
        private Dictionary<string, string> _options;

        public CustomPeopleFetcher(IConnectorService _connectorService, IPeopleDirectoryUserStorageHandler _storageHandler)
        {
            ConnectorServiceInstance = _connectorService;
            Storage = _storageHandler;
        }

        public PeopleDirectoryFetchResult FetchUsers()
        {
            PeopleDirectoryFetchResult result = new PeopleDirectoryFetchResult() { IsComplete = false, IsError = true, Message = "Unknown Error" };

            #region Get all Users
            System.IO.StreamReader reader = null;

            try
            {
                //TraceEvents.Log.Error("\nRetrieving Users");
                Storage.Delete();

                //Storing an xml file within our hosted files. Alternative approach would be to retrieve from a web url
                var requestUrl = Path.Combine(HostingEnvironment.ApplicationPhysicalPath, "SiteDefinitions", "export.xml");

                System.Net.WebRequest request = System.Net.WebRequest.Create(requestUrl);

                var responseStream = request.GetResponse().GetResponseStream();

                reader = new System.IO.StreamReader(responseStream);

                string usersXml = reader.ReadToEnd();

                System.Xml.XmlDocument xmlDoc = new System.Xml.XmlDocument();
                xmlDoc.LoadXml(usersXml);

                List<PeopleDirectoryUser> aadUserList = Read(xmlDoc);

                result.Users = aadUserList;
                result.UserCount = aadUserList.Count;
                result.IsComplete = true;
                result.IsError = false;
                result.Message = string.Empty;
            }
            catch (Exception e)
            {

                result.IsError = true;
                result.Message = string.Format("\nError getting Users. {0} {1}", e.Message,
                    e.InnerException != null ? e.InnerException.Message : "");

                //TraceEvents.Log.Error(result.Message);
            }
            finally
            {
                if (reader != null)
                {
                    reader.Dispose();
                    reader = null;
                }
            }

            #endregion
            return result;
        }

        public void Initialize(Dictionary<string, string> fetcherOptions)
        {
            _options = fetcherOptions;
        }

        private List<PeopleDirectoryUser> Read(System.Xml.XmlDocument xmlDoc)
        {
            List<PeopleDirectoryUser> aadusers = new List<PeopleDirectoryUser>();

            try
            {
                List<KeyValuePair<string, string>> properties = null;

                foreach (System.Xml.XmlElement userNode in xmlDoc.SelectNodes("//User"))
                {
                    properties = new List<KeyValuePair<string, string>>();

                    foreach (System.Xml.XmlAttribute userPropAttribute in userNode.Attributes)
                    {
                        properties.Add(new KeyValuePair<string, string>(userPropAttribute.Name, userPropAttribute.Value));
                    }

                    aadusers.Add(new PeopleDirectoryUser(properties.ToArray()));
                }
            }
            catch (Exception ex)
            {
                aadusers.Clear();
                //TraceEvents.Log.Error(string.Format("Error detail: {0}", ex.InnerException.Message));
            }

            return aadusers;
        }
    }
}
