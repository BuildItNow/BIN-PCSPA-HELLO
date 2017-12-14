var config = 
{
    target: "web",
	destPath: "client-build",
    tempPath: "client-build-temp",
    clientPatterns : [],
    mergeBINViews : true,
    binParsedVariableTracingPatterns : ["!3rdParty/**", "!bin/3rdParty/**", "!bin/web/3rdParty/**"],
    binParsedVariables :
    {
        version : Date.now(),
        binGithub: "https://www.github.com/BuildItNow/BIN"
    }
}

module.exports = config;