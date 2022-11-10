/**
 * @name uwuifier
 * @author Ahlawat
 * @authorId 887483349369765930
 * @version 1.1.1
 * @invite SgKSKyh9gY
 * @description Adds a slash command to uwuify the text you send.
 * @website https://tharki-god.github.io/
 * @source https://github.com/Tharki-God/BetterDiscordPlugins
 * @updateUrl https://raw.githubusercontent.com/Tharki-God/BetterDiscordPlugins/master/uwuifier.plugin.js
 */
/*@cc_on
@if (@_jscript)
var shell = WScript.CreateObject("WScript.Shell");
var fs = new ActiveXObject("Scripting.FileSystemObject");
var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
var pathSelf = WScript.ScriptFullName;
shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
} else if (!fs.FolderExists(pathPlugins)) {
shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
} else if (shell.Popup("Should I move myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
fs.MoveFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)));
shell.Exec("explorer " + pathPlugins);
shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
}
WScript.Quit();
@else@*/
module.exports = (() => {
	const config = {
	  info: {
		name: "uwuifier",
		authors: [
		  {
			name: "Ahlawat",
			discord_id: "887483349369765930",
			github_username: "Tharki-God",
		  },
		],
		version: "1.1.1",
		description: "Adds a slash command to uwuify the text you send.",
		github: "https://github.com/Tharki-God/BetterDiscordPlugins",
		github_raw:
		  "https://raw.githubusercontent.com/Tharki-God/BetterDiscordPlugins/master/uwuifier.plugin.js",
	  },
	  changelog: [
		{
		  title: "v0.0.1",
		  items: ["Idea in mind"],
		},
		{
		  title: "v0.0.5",
		  items: ["Base Model"],
		},
		{
		  title: "Initial Release v1.0.0",
		  items: [
			"This is the initial release of the plugin :)",
			"I :3 wannya *looks at you* cuddwe w-w-with my fiancee :3 (p≧w≦q)",
		  ],
		},
                {
                  title: "v1.1.1",
                  items: ["Cowwected text. ^-^"],
                },
	  ],
	  main: "uwuifier.plugin.js",
	};
	return !window.hasOwnProperty("ZeresPluginLibrary")
	  ? class {
		  load() {
			BdApi.showConfirmationModal(
			  "ZLib Missing",
			  `The library plugin (ZeresPluginLibrary) needed for ${config.info.name} is missing. Please click Download Now to install it.`,
			  {
				confirmText: "Download Now",
				cancelText: "Cancel",
				onConfirm: () => this.downloadZLib(),
			  }
			);
		  }
		  async downloadZLib() {
			const fs = require("fs");
			const path = require("path");
			const ZLib = await fetch(
			  "https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js"
			);
			if (!ZLib.ok) return this.errorDownloadZLib();
			const ZLibContent = await ZLib.text();
			try {
			  await fs.writeFile(
				path.join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"),
				ZLibContent,
				(err) => {
				  if (err) return this.errorDownloadZLib();
				}
			  );
			} catch (err) {
			  return this.errorDownloadZLib();
			}
		  }
		  errorDownloadZLib() {
			const { shell } = require("electron");
			BdApi.showConfirmationModal(
			  "Error Downloading",
			  [
				`ZeresPluginLibrary download failed. Manually install plugin library from the link below.`,
			  ],
			  {
				confirmText: "Download",
				cancelText: "Cancel",
				onConfirm: () => {
				  shell.openExternal(
					"https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js"
				  );
				},
			  }
			);
		  }
		  start() {}
		  stop() {}
		}
	  : (([Plugin, Library]) => {
		  const {
			WebpackModules,
			PluginUpdater,
			Logger,
			Patcher,
			DiscordModules: { MessageActions },
		  } = Library;
		  const request = require("request");
		  const SlashCommandStore = WebpackModules.getModule(
			(m) => m?.Kh?.toString?.()?.includes?.("BUILT_IN_TEXT")
		  );
		  return class uwuifier extends Plugin {
			checkForUpdates() {
			  try {
				PluginUpdater.checkForUpdate(
				  config.info.name,
				  config.info.version,
				  config.info.github_raw
				);
			  } catch (err) {
				Logger.err("Plugin Updater could not be reached.", err);
			  }
			}
			start() {
			  this.checkForUpdates();
			  this.addCommand();
			}
			addCommand() {
				Patcher.after(SlashCommandStore, "Kh", (_, args, res) => {
					if (args[0] !== 1) return;
					res.push({
						__registerId: config.info.name,
						applicationId: "-1",
						name: "uwuify",
						displayName: "uwuify",
						displayDescription: "uwuify your text.",
						description: "uwuify your text.",
						id: (-1 - res.length).toString(),
						type: 1,
						target: 1,
						predicate: () => true,
						execute: async ([send, text], { channel }) => {
						  try {
							const uwufied = await this.uwuify(text.value);
							send.value
							  ? MessageActions.sendMessage(
								  channel.id,
								  {
									content: uwufied,
									tts: false,
									invalidEmojis: [],
									validNonShortcutEmojis: [],
								  },
								  undefined,
								  {}
								)
							  : MessageActions.sendBotMessage(channel.id, uwufied);
						  } catch (err) {
							Logger.err(err);
							MessageActions.sendBotMessage(
							  channel.id,
							  "Couwdn't ^-^ uwuify OwO youw message. P-P-Pwease twy UwU again watew"
							);
						  }
						},
						options: [
						  {
							description: "Whether you want to send this or not.",
							displayDescription: "Whether you want to send this or not.",
							displayName: "Send",
							name: "Send",
							required: true,
							type: 5,
						  },
						  {
							description: "The text you want uwuify. uwu <3",
							displayDescription: "The text you want uwuify. uwu <3",
							displayName: "Text",
							name: "Text",
							required: true,
							type: 3,
						  },
						],
					  });
				  });
			}
			uwuify(text) {
				return new Promise((resolve, reject) => {
					const options = [
					  `https://uwuifier-nattexd.vercel.app/api/uwuify/${encodeURI(text)}`,
					  { json: true },
					];
					request.get(...options, (err, res, body) => {
					  if (err || (res.statusCode < 200 && res.statusCode > 400)) 
						return reject("Unwown ewwow occuwwed.");              
					resolve(JSON.parse(body).message)
				  });
				});
			}
			onStop() {
			  Patcher.unpatchAll();
			}			
		  };
		  return plugin(Plugin, Library);
		})(window.ZeresPluginLibrary.buildPlugin(config));
  })();
  /*@end@*/
  
