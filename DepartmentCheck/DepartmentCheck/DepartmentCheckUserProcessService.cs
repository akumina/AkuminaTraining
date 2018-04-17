using Akumina.Interchange.Core.Entities.Connector;
using Akumina.Interchange.Core.Interfaces;
using Akumina.Interchange.Services;
using Akumina.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DepartmentCheck
{
    public class DepartmentCheckUserProcessService : BaseService, IPeopleDirectoryUserProcessor
    {
        private Dictionary<string, string> _options;

        public void Initialize(Dictionary<string, string> processorOptions)
        {
            _options = processorOptions;
        }

        public PeopleDirectoryFetchResult Execute(PeopleDirectoryFetchResult fetchedUsers)
        {
            try
            {
                //remove users without given name and surname
                //remove users with disabled accounts
                fetchedUsers.Users =
                    fetchedUsers.Users.Where(user =>
                        !string.IsNullOrEmpty(user.GetValueForProperty("GivenName")) &&
                        !string.IsNullOrEmpty(user.GetValueForProperty("Surname")) &&
                        !string.IsNullOrEmpty(user.GetValueForProperty("Department")) &&
                        (user.GetValueForProperty("AccountEnabled") != "" ? bool.Parse(user.GetValueForProperty("AccountEnabled")) : true)
                    ).ToList();

                fetchedUsers.UserCount = fetchedUsers.Users.Count;
            }
            catch (Exception e)
            {
                fetchedUsers.IsError = true;
                fetchedUsers.Message = $"\nError processing Users. {e.Message} {e.InnerException?.Message ?? ""}";

                TraceEvents.Log.Error(fetchedUsers.Message);
            }

            return fetchedUsers;
        }
    }
}
