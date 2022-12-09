/**
 * @name Address
 * @author Ahlawat
 * @authorId 1025214794766221384
 * @version 1.2.7
 * @invite SgKSKyh9gY
 * @description Get an option to copy the current web address by right clicking on the home button.
 * @website https://tharki-god.github.io/
 * @source https://github.com/Tharki-God/BetterDiscordPlugins
 * @updateUrl https://raw.githubusercontent.com/Tharki-God/BetterDiscordPlugins/master/Address.plugin.js
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
module.exports = ((_) => {
  const config = {
    info: {
      name: "Address",
      authors: [
        {
          name: "Ahlawat",
          discord_id: "1025214794766221384",
          github_username: "Tharki-God",
        },
      ],
      version: "1.2.7",
      description:
        "Get an option to copy the current web address by right clicking on the home button.",
      github: "https://github.com/Tharki-God/BetterDiscordPlugins",
      github_raw:
        "https://raw.githubusercontent.com/Tharki-God/BetterDiscordPlugins/master/Address.plugin.js",
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
          "Who uses web discord anyways (ノω<。)ノ))☆.。",
        ],
      },
      {
        title: "v1.0.1",
        items: [
          "Option to normalize address to normal discord from ptb/canary.",
        ],
      },
      {
        title: "v1.2.2",
        items: ["Corrected text."],
      },
    ],
    main: "Address.plugin.js",
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
          Patcher,
          ContextMenu,
          Utilities,
          Toasts,
          Logger,
          PluginUpdater,
          ReactTools,
          Settings: { SettingPanel, Switch },
          DiscordModules: { React },
        } = Library;
        const { clipboard } = WebpackModules.getByProps("clipboard");
        const copyIcon = (width, height) =>
          React.createElement(
            "svg",
            {
              viewBox: "0 0 490 490",
              width,
              height,
            },
            React.createElement("path", {
              style: {
                fill: "currentColor",
              },
              d: "M245,0C109.69,0,0,109.69,0,245s109.69,245,245,245s245-109.69,245-245S380.31,0,245,0z M31.401,260.313h52.542 c1.169,25.423,5.011,48.683,10.978,69.572H48.232C38.883,308.299,33.148,284.858,31.401,260.313z M320.58,229.688 c-1.152-24.613-4.07-47.927-8.02-69.572h50.192c6.681,20.544,11.267,43.71,12.65,69.572H320.58z M206.38,329.885 c-4.322-23.863-6.443-47.156-6.836-69.572h90.913c-0.392,22.416-2.514,45.709-6.837,69.572H206.38z M276.948,360.51 c-7.18,27.563-17.573,55.66-31.951,83.818c-14.376-28.158-24.767-56.255-31.946-83.818H276.948z M199.961,229.688 c1.213-24.754,4.343-48.08,8.499-69.572h73.08c4.157,21.492,7.286,44.818,8.5,69.572H199.961z M215.342,129.492 c9.57-37.359,21.394-66.835,29.656-84.983c8.263,18.148,20.088,47.624,29.66,84.983H215.342z M306.07,129.492 c-9.77-40.487-22.315-73.01-31.627-94.03c11.573,8.235,50.022,38.673,76.25,94.03H306.07z M215.553,35.46 c-9.312,21.02-21.855,53.544-31.624,94.032h-44.628C165.532,74.13,203.984,43.692,215.553,35.46z M177.44,160.117 c-3.95,21.645-6.867,44.959-8.019,69.572h-54.828c1.383-25.861,5.968-49.028,12.65-69.572H177.44z M83.976,229.688H31.401 c1.747-24.545,7.481-47.984,16.83-69.572h46.902C89.122,181.002,85.204,204.246,83.976,229.688z M114.577,260.313h54.424 c0.348,22.454,2.237,45.716,6.241,69.572h-47.983C120.521,309.288,115.92,286.115,114.577,260.313z M181.584,360.51 c7.512,31.183,18.67,63.054,34.744,95.053c-10.847-7.766-50.278-38.782-77.013-95.053H181.584z M273.635,455.632 c16.094-32.022,27.262-63.916,34.781-95.122h42.575C324.336,417.068,284.736,447.827,273.635,455.632z M314.759,329.885 c4.005-23.856,5.894-47.118,6.241-69.572h54.434c-1.317,25.849-5.844,49.016-12.483,69.572H314.759z M406.051,260.313h52.548 c-1.748,24.545-7.482,47.985-16.831,69.572h-46.694C401.041,308.996,404.882,285.736,406.051,260.313z M406.019,229.688 c-1.228-25.443-5.146-48.686-11.157-69.572h46.908c9.35,21.587,15.083,45.026,16.83,69.572H406.019z M425.309,129.492h-41.242 c-13.689-32.974-31.535-59.058-48.329-78.436C372.475,68.316,403.518,95.596,425.309,129.492z M154.252,51.06 c-16.792,19.378-34.636,45.461-48.324,78.432H64.691C86.48,95.598,117.52,68.321,154.252,51.06z M64.692,360.51h40.987 c13.482,32.637,31.076,58.634,47.752,78.034C117.059,421.262,86.318,394.148,64.692,360.51z M336.576,438.54 c16.672-19.398,34.263-45.395,47.742-78.03h40.99C403.684,394.146,372.945,421.258,336.576,438.54z",
            })
          );
        const defaultSettings = {
          showToast: true,
          normalizeAddress: true,
        };
        const GuildNav = WebpackModules.getModule((m) =>
          m?.type?.toString?.()?.includes("guildsnav")
        );
        const NavBar = WebpackModules.getByProps("guilds", "base");
        const HomeButtonContextMenuApi = new class {
          constructor() {
            this.version = "1.0.1";
            this.items = window?.HomeButtonContextMenuApi?.items ?? new Map();
            Patcher.after(GuildNav, "type", (_, args, res) => {
              const HomeButtonContextMenuItems = Array.from(this.items.values()).sort(
                (a, b) => a.label.localeCompare(b.label)
              );
              const GuildNavBar = Utilities.findInReactTree(res, (m) =>
                m?.props?.className?.split(" ").includes(NavBar.guilds)
              );
              if (!GuildNavBar || !HomeButtonContextMenuItems) return;
              Patcher.after(GuildNavBar, "type", (_, args, res) => {
                const HomeButton = Utilities.findInReactTree(res, (m) =>
                  m?.type?.toString().includes("getHomeLink")
                );
                if (!HomeButton) return;
                Patcher.after(HomeButton, "type", (_, args, res) => {
                  Patcher.after(res, "type", (_, args, res) => {
                    res.props.onContextMenu = (event) =>
                      ContextMenu.openContextMenu(
                        event,
                        ContextMenu.buildMenu(HomeButtonContextMenuItems)
                      );
                  });
                });
              });
            });
          }
          insert(id, item) {
            this.items.set(id, item);
            this.forceUpdate();
          };
           remove(id) {
            this.items.delete(id);
            this.forceUpdate();
          };
          forceUpdate() {
            const element = document.querySelector(`.${NavBar.guilds}`);
            if (!element) return;
            const toForceUpdate = ReactTools.getOwnerInstance(element);
            const forceRerender = Patcher.instead(
              toForceUpdate,
              "render",
              () => {
                forceRerender();
                return null;
              }
            );
            toForceUpdate.forceUpdate(() =>
              toForceUpdate.forceUpdate(() => {})
            );
          }
          shouldUpdate(currentApiVersion = window?.HomeButtonContextMenuApi?.version, pluginApiVersion = this.version) {
            if (!currentApiVersion) return true;
            else if (!pluginApiVersion) return false;
            currentApiVersion = currentApiVersion.split(".").map((e) => parseInt(e));
            pluginApiVersion = pluginApiVersion.split(".").map((e) => parseInt(e));
            if ((pluginApiVersion[0] > currentApiVersion[0]) || (pluginApiVersion[0] == currentApiVersion[0] && pluginApiVersion[1] > currentApiVersion[1]) || (pluginApiVersion[0] == currentApiVersion[0] && pluginApiVersion[1] == currentApiVersion[1] && pluginApiVersion[2] > currentApiVersion[2])) return true;
            return false;
        }
        };
        const ContextMenuAPI = HomeButtonContextMenuApi.shouldUpdate() ? window.HomeButtonContextMenuApi = HomeButtonContextMenuApi : window.HomeButtonContextMenuApi;
        return class Address extends Plugin {
          constructor() {
            super();
            this.settings = Utilities.loadData(
              config.info.name,
              "settings",
              defaultSettings
            );
          }
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
          onStart() {
            this.checkForUpdates();
            this.addMenu();
          }
          addMenu() {
            ContextMenuAPI.insert(config.info.name, this.makeMenuItem());
          }
          makeMenuItem() {
            return {
              label: "Copy Address",
              id: "copy-address",
              icon: () => copyIcon("20", "20"),
              action: async () => {
                try {
                  var Address = window.location.href;
                  if (this.settings["normalizeAddress"])
                    var Address = `https://discord.com/${
                      Address.split("discord.com/")[1]
                    }`;
                  if (!Address) {
                    Logger.err(
                      `Whoops! I couldn't find the current web address.`
                    );
                    if (this.settings["showToast"])
                      Toasts.show(
                        `Whoops! I couldn't find the current web address.`,
                        {
                          icon: "https://raw.githubusercontent.com/Tharki-God/files-random-host/main/ic_fluent_error_circle_24_regular.png",
                          timeout: 5000,
                          type: "error",
                        }
                      );
                    return;
                  }
                  clipboard.copy(Address);
                  if (this.settings["showToast"])
                    Toasts.show(`Address Copied to Clipboard.`, {
                      icon: "https://raw.githubusercontent.com/Tharki-God/files-random-host/main/ic_fluent_send_copy_24_regular.png",
                      timeout: 5000,
                      type: "success",
                    });
                } catch (err) {
                  if (this.settings["showToast"])
                    Toasts.show(`Error: ${err}.`, {
                      icon: "https://raw.githubusercontent.com/Tharki-God/files-random-host/main/ic_fluent_error_circle_24_regular.png",
                      timeout: 5000,
                      type: "error",
                    });
                  Logger.err(err);
                }
              },
            };
          }
          onStop() {
            this.removeMenu();
          }
          removeMenu() {
            ContextMenuAPI.remove(config.info.name);
          }
          getSettingsPanel() {
            return SettingPanel.build(
              this.saveSettings.bind(this),
              new Switch(
                "Pop-up/Toast",
                "Get a confirmation/error message when copying the web address.",
                this.settings["showToast"],
                (e) => {
                  this.settings["showToast"] = e;
                }
              ),
              new Switch(
                "Normalize address",
                "Replace PTB/Canary links with normal (Stable) Discord links.",
                this.settings["normalizeAddress"],
                (e) => {
                  this.settings["normalizeAddress"] = e;
                }
              )
            );
          }
          saveSettings() {
            Utilities.saveData(config.info.name, "settings", this.settings);
          }
        };
        return plugin(Plugin, Library);
      })(window.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/
