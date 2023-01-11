using FixMyTax.Debugging;

namespace FixMyTax
{
    public class FixMyTaxConsts
    {
        public const string LocalizationSourceName = "FixMyTax";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "56a6292d54b74dd1a55d69b907955f52";
    }
}
