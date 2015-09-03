(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    var service = 'KEYCHAINSHARINGPLUGIN';
    var key = 'DEMO_KEY';

    DemoViewModel = kendo.data.ObservableObject.extend({

        setValueA: function () {
            if (this.isIOSDevice()) {
                KeychainSharing.set({key: key, val: 'A', service: service}, this.onSuccess, this.onError);
            }
        },

        setValueB: function () {
            if (this.isIOSDevice()) {
                KeychainSharing.set({key: key, val: 'B', service: service}, this.onSuccess, this.onError);
            }
        },

        getValue: function () {
            if (this.isIOSDevice()) {
                KeychainSharing.get({key: key, service: service}, this.onSuccess, this.onError);
            }
        },
        
        removeValue: function () {
            if (this.isIOSDevice()) {
                KeychainSharing.remove({key: key, service: service}, this.onSuccess, this.onError);
            }
        },
        
        isIOSDevice: function() {
            if (device.platform.toLowerCase() != 'ios') {
                alert('This plugin is iOS-only');
                return false;
            }
            return !this.checkSimulator();
        },

        checkSimulator: function() {
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator.');
                return true;
            } else if (window.KeychainSharing === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        },

        // callbacks
        onSuccess: function(msg) {
            navigator.notification.alert(JSON.stringify(msg), null, 'Success callback', 'Close');
        },

        onError: function(msg) {
            navigator.notification.alert(JSON.stringify(msg), null, 'Error callback', 'Close');
        }
    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);
