using PostalBag.Debugging;

namespace PostalBag
{
    public class PostalBagConsts
    {
        public const string LocalizationSourceName = "PostalBag";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = false;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "bbdb3e0d18494c608d7dd96b25af2b47";
    }
}
