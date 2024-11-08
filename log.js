
        (function() {
            const consoleDiv = document.createElement("div");
            consoleDiv.id = "console";
            document.body.appendChild(consoleDiv);

            Object.assign(consoleDiv.style, {
                position: "fixed",
                bottom: "0",
                left: "0",
                width: "100%",
                maxHeight: "200px",
                overflowY: "scroll",
                background: "rgba(255, 255, 255, 0.4)",
                color: "black",
                fontFamily: "monospace",
                padding: "10px",
                zIndex: "10000"
            });

            function logToScreen(type, args) {
                const message = document.createElement("div");
                message.textContent = `${type}: ${Array.from(args).join(" ")}`;
                consoleDiv.appendChild(message);
                consoleDiv.scrollTop = consoleDiv.scrollHeight;
            }

            ['log', 'warn', 'error'].forEach((method) => {
                const original = console[method];
                console[method] = function(...args) {
                    logToScreen(method, args);
                    original.apply(console, args);
                };
            });

            window.onerror = function(message, source, lineno, colno, error) {
                logToScreen("Uncaught Error", [message, `at ${source}:${lineno}:${colno}`]);
            };

            window.addEventListener("unhandledrejection", function(event) {
                logToScreen("Unhandled Promise Rejection", [event.reason]);
            });
        })();
