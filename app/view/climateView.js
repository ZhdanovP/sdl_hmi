/*
 * Copyright (c) 2013, Ford Motor Company All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *  · Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *  · Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *  · Neither the name of the Ford Motor Company nor the names of its
 * contributors may be used to endorse or promote products derived from this
 * software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @name SDL.PlayerControllsView
 * @desc Video player visual representation
 * @category View
 * @filesource app/view/player/PlayerView.js
 * @version 1.0
 */
SDL.ClimateView = Em.ContainerView.create(
  {
    /** View Id */
    elementId: 'climateView',
    classNameBindings: [
      'SDL.States.climate.active:active_state:inactive_state'
    ],
    childViews: [
      'windowText',
      'climateView'
    ],
    windowText: SDL.Label.extend(
      {
        classNames: 'windowText',
        content: 'Climate'
      }
    ),
    climateView: Em.ContainerView.extend(
      {
        elementId: 'climate_control',
        classNameBindings: 'SDL.FuncSwitcher.rev::is-disabled',
        childViews: [
          'desiredTemp',
          'desiredTempLabel',
          'fanSpeed',
          'fanSpeedLabel',
          'currentTemp',
          'currentTempSwitcher',
          'curentTempLabel',
          'defrostZone',
          'temperatureUnit',
          'ventilationMode',
          'acEnable',
          'acMaxEnable',
          'autoModeEnable',
          'dualModeEnable',
          'recirculateAirEnable'
        ],
        desiredTemp: Em.ContainerView.extend(
          {
            elementId: 'desiredTemp_container',
            classNames: 'calc_container',
            childViews: [
              'desiredTemp_label',
              'desiredTemp_minus',
              'desiredTemp_plus'
            ],
            desiredTemp_minus: SDL.Button.extend(
              {
                elementId: 'desiredTemp_minus',
                classNames: 'minus',
                templateName: 'icon',
                icon: 'images/climate/minus_ico.png',
                onDown: false,
                action: 'desiredTempDown',
                target: 'SDL.ClimateController.model'
              }
            ),
            desiredTemp_label: SDL.Label.extend(
              {
                elementId: 'desiredTemp_label',
                temp: function() {
                  switch (SDL.ClimateController.model.climateControlData.temperatureUnit) {
                    case 'CELSIUS':
                    {
                      return SDL.ClimateController.model.climateControlData.desiredTemp;
                    }
                    case 'FAHRENHEIT':
                    {
                      return SDL.ClimateController.model.climateControlData.desiredTemp *
                        9 / 5 + 32;
                    }
                  }
                }.property(
                  'SDL.ClimateController.model.climateControlData.desiredTemp',
                  'SDL.ClimateController.model.climateControlData.temperatureUnit'
                ),
                contentBinding: 'temp'
              }
            ),
            desiredTemp_plus: SDL.Button.extend(
              {
                elementId: 'desiredTemp_plus',
                classNames: 'plus',
                templateName: 'icon',
                icon: 'images/climate/plus_ico.png',
                onDown: false,
                action: 'desiredTempUp',
                target: 'SDL.ClimateController.model'
              }
            )
          }
        ),
        desiredTempLabel: SDL.Label.extend(
          {
            elementId: 'desiredTempLabel',
            content: 'Desired temp'
          }
        ),
        fanSpeed: Em.ContainerView.extend(
          {
            elementId: 'fanSpeed_container',
            classNames: 'calc_container',
            childViews: [
              'fanSpeed_label',
              'fanSpeed_minus',
              'fanSpeed_plus'
            ],
            fanSpeed_minus: SDL.Button.extend(
              {
                elementId: 'fanSpeed_minus',
                classNames: 'minus',
                templateName: 'icon',
                icon: 'images/climate/minus_ico.png',
                onDown: false,
                action: 'fanSpeedDown',
                target: 'SDL.ClimateController.model'
              }
            ),
            fanSpeed_label: SDL.Label.extend(
              {
                elementId: 'fanSpeed_label',
                contentBinding: 'SDL.ClimateController.model.climateControlData.fanSpeed'
              }
            ),
            fanSpeed_plus: SDL.Button.extend(
              {
                elementId: 'fanSpeed_plus',
                classNames: 'plus',
                templateName: 'icon',
                icon: 'images/climate/plus_ico.png',
                onDown: false,
                action: 'fanSpeedUp',
                target: 'SDL.ClimateController.model'
              }
            )
          }
        ),
        fanSpeedLabel: SDL.Label.extend(
          {
            elementId: 'fanSpeedLabel',
            content: 'Fan speed'
          }
        ),
        currentTemp: Em.ContainerView.extend(
          {
            elementId: 'currentTemp_container',
            classNames: 'calc_container',
            childViews: [
              'currentTemp_label',
              'currentTemp_minus',
              'currentTemp_plus'
            ],
            currentTemp_minus: SDL.Button.extend(
              {
                disabledBinding: 'SDL.ClimateController.model.climateControlData.currentTempEditDisabled',
                elementId: 'currentTemp_minus',
                classNames: 'minus',
                templateName: 'icon',
                icon: 'images/climate/minus_ico.png',
                onDown: false,
                action: 'currentTempDown',
                target: 'SDL.ClimateController.model'
              }
            ),
            currentTemp_label: SDL.Label.extend(
              {
                elementId: 'currentTemp_label',
                temp: function() {
                  switch (SDL.ClimateController.model.climateControlData.temperatureUnit) {
                    case 'CELSIUS':
                    {
                      return SDL.ClimateController.model.climateControlData.currentTemp;
                    }
                    case 'FAHRENHEIT':
                    {
                      return SDL.ClimateController.model.climateControlData.currentTemp *
                        9 / 5 + 32;
                    }
                  }
                }.property(
                  'SDL.ClimateController.model.climateControlData.currentTemp',
                  'SDL.ClimateController.model.climateControlData.temperatureUnit'
                ),
                contentBinding: 'temp'
              }
            ),
            currentTemp_plus: SDL.Button.extend(
              {
                disabledBinding: 'SDL.ClimateController.model.climateControlData.currentTempEditDisabled',
                elementId: 'currentTemp_plus',
                classNames: 'plus',
                templateName: 'icon',
                icon: 'images/climate/plus_ico.png',
                onDown: false,
                action: 'currentTempUp',
                target: 'SDL.ClimateController.model'
              }
            )
          }
        ),
        currentTempSwitcher: SDL.Button.extend(
          {
            elementId: 'currentTempSwitcher',
            classNames: 'currentTempSwitcher smallSwitcher',
            iconBinding: 'onIconChange',
            disabledBinding: 'parentView.disabled',
            onIconChange: function() {
              if (SDL.ClimateController.model.climateControlData.currentTempEditDisabled) {
                return 'images/media/passiv_horiz_led.png';
              } else {
                return 'images/media/active_horiz_led.png';
              }
            }.property(
              'SDL.ClimateController.model.climateControlData.currentTempEditDisabled'
            ),
            action: 'currentTempAvailableClick',
            target: 'SDL.ClimateController.model',
            onDown: false
          }
        ),
        curentTempLabel: SDL.Label.extend(
          {
            elementId: 'curentTempLabel',
            content: 'Current temp'
          }
        ),
        defrostZone: Em.ContainerView.extend(
          {
            elementId: 'defrostZone',
            classNames: 'quattro_container',
            childViews: [
              'defrostZone_None',
              'defrostZone_Rear',
              'defrostZone_Front',
              'defrostZone_All'
            ],
            selectedBinding: 'SDL.ClimateController.model.climateControlData.defrostZone',
            defrostZone_None: SDL.Button.extend(
              {
                elementId: 'defrostZoneNone',
                classNames: 'defrostZoneNone topLeft',
                classNameBindings: 'highlighted',
                highlighted: function() {
                  return this._parentView.selected === 'NONE';
                }.property('parentView.selected'),
                text: 'NONE',
                onDown: false,
                disabledBinding: 'parentView.parentView.disabled',
                action: 'defrostNoneEnable',
                target: 'SDL.ClimateController.model'
              }
            ),
            defrostZone_Rear: SDL.Button.extend(
              {
                elementId: 'defrostZoneRear',
                classNames: 'defrostZoneRear topRight',
                classNameBindings: 'highlighted',
                highlighted: function() {
                  return this._parentView.selected === 'REAR';
                }.property('parentView.selected'),
                templateName: 'icon',
                icon: 'images/climate/defrost_ico.png',
                onDown: false,
                disabledBinding: 'parentView.parentView.disabled',
                action: 'defrostRearEnable',
                target: 'SDL.ClimateController.model'
              }
            ),
            defrostZone_Front: SDL.Button.extend(
              {
                elementId: 'defrostZoneFront',
                classNames: 'defrostZoneFront bottomLeft',
                classNameBindings: 'highlighted',
                highlighted: function() {
                  return this._parentView.selected === 'FRONT';
                }.property('parentView.selected'),
                templateName: 'icon',
                icon: 'images/climate/windsheald_ico.png',
                onDown: false,
                disabledBinding: 'parentView.parentView.disabled',
                action: 'defrostFrontEnable',
                target: 'SDL.ClimateController.model'
              }
            ),
            defrostZone_All: SDL.Button.extend(
              {
                elementId: 'defrostZoneAll',
                classNames: 'defrostZoneAll bottomRight',
                classNameBindings: 'highlighted',
                highlighted: function() {
                  return this._parentView.selected === 'ALL';
                }.property('parentView.selected'),
                text: 'BOTH',
                onDown: false,
                disabledBinding: 'parentView.parentView.disabled',
                action: 'defrostAllEnable',
                target: 'SDL.ClimateController.model'
              }
            )
          }
        ),
        temperatureUnit: Em.ContainerView.extend(
          {
            elementId: 'temperatureUnit',
            classNames: 'quattro_container',
            childViews: [
              'fahrenheit',
              'celsius'
            ],
            selectedBinding: 'SDL.ClimateController.model.climateControlData.temperatureUnit',
            fahrenheit: SDL.Button.extend(
              {
                elementId: 'fahrenheit',
                classNames: 'fahrenheit bottomLeft',
                classNameBindings: 'highlighted',
                highlighted: function() {
                  return this._parentView.selected === 'FAHRENHEIT';
                }.property('parentView.selected'),
                text: 'F',
                onDown: false,
                disabledBinding: 'parentView.parentView.disabled',
                action: 'temperatureUnitFahrenheitEnable',
                target: 'SDL.ClimateController.model'
              }
            ),
            celsius: SDL.Button.extend(
              {
                elementId: 'celsius',
                classNames: 'celsius bottomRight',
                classNameBindings: 'highlighted',
                highlighted: function() {
                  return this._parentView.selected === 'CELSIUS';
                }.property('parentView.selected'),
                text: 'C',
                onDown: false,
                disabledBinding: 'parentView.parentView.disabled',
                action: 'temperatureUnitCelsiusEnable',
                target: 'SDL.ClimateController.model'
              }
            )
          }
        ),
        ventilationMode: Em.ContainerView.extend(
          {
            elementId: 'ventilationMode',
            classNames: 'quattro_container',
            childViews: [
              'ventilationMode_None',
              'ventilationMode_Upper',
              'ventilationMode_Lower',
              'ventilationMode_Both'
            ],
            selectedBinding: 'SDL.ClimateController.model.climateControlData.currentVentilationMode',
            ventilationMode_None: SDL.Button.extend(
              {
                elementId: 'ventilationModeNone',
                classNames: 'ventilationModeNone topLeft',
                classNameBindings: 'highlighted',
                highlighted: function() {
                  return this._parentView.selected === 'NONE';
                }.property('parentView.selected'),
                text: 'NONE',
                onDown: false,
                disabledBinding: 'parentView.parentView.disabled',
                action: 'ventilationModeNoneEnable',
                target: 'SDL.ClimateController.model'
              }
            ),
            ventilationMode_Upper: SDL.Button.extend(
              {
                elementId: 'ventilationModeUpper',
                classNames: 'ventilationModeUpper topRight',
                classNameBindings: 'highlighted',
                highlighted: function() {
                  return this._parentView.selected === 'UPPER';
                }.property('parentView.selected'),
                text: 'UP',
                onDown: false,
                disabledBinding: 'parentView.parentView.disabled',
                action: 'ventilationModeUpperEnable',
                target: 'SDL.ClimateController.model'
              }
            ),
            ventilationMode_Lower: SDL.Button.extend(
              {
                elementId: 'ventilationModeLower',
                classNames: 'ventilationModeLower bottomLeft',
                classNameBindings: 'highlighted',
                highlighted: function() {
                  return this._parentView.selected === 'LOWER';
                }.property('parentView.selected'),
                text: 'LOW',
                onDown: false,
                disabledBinding: 'parentView.parentView.disabled',
                action: 'ventilationModeLowerEnable',
                target: 'SDL.ClimateController.model'
              }
            ),
            ventilationMode_Both: SDL.Button.extend(
              {
                elementId: 'ventilationModeBoth',
                classNames: 'ventilationModeBoth bottomRight',
                classNameBindings: 'highlighted',
                highlighted: function() {
                  return this._parentView.selected === 'BOTH';
                }.property('parentView.selected'),
                text: 'BOTH',
                onDown: false,
                disabledBinding: 'parentView.parentView.disabled',
                action: 'ventilationModeBothEnable',
                target: 'SDL.ClimateController.model'
              }
            )
          }
        ),
        acEnable: SDL.Button.extend(
          {
            elementId: 'acEnable',
            classNames: 'acEnable switcher',
            iconBinding: 'onIconChange',
            disabledBinding: 'parentView.disabled',
            // Change Icon for Frequency Scan
            onIconChange: function() {
              if (SDL.ClimateController.model.climateControlData.acEnable) {
                return 'images/media/active_horiz_led.png';
              } else {
                return 'images/media/passiv_horiz_led.png';
              }
            }.property(
              'SDL.ClimateController.model.climateControlData.acEnable'
            ),
            action: 'toggleAcEnable',
            target: 'SDL.ClimateController.model',
            onDown: false,
            text: 'AC'
          }
        ),
        acMaxEnable: SDL.Button.extend(
          {
            elementId: 'acMaxEnable',
            classNames: 'acMaxEnable switcher',
            iconBinding: 'onIconChange',
            disabledBinding: 'parentView.disabled',
            onIconChange: function() {
              if (SDL.ClimateController.model.climateControlData.acMaxEnable) {
                return 'images/media/active_horiz_led.png';
              } else {
                return 'images/media/passiv_horiz_led.png';
              }
            }.property(
              'SDL.ClimateController.model.climateControlData.acMaxEnable'
            ),
            action: 'toggleAcMaxEnable',
            target: 'SDL.ClimateController.model',
            onDown: false,
            text: 'AC max'
          }
        ),
        autoModeEnable: SDL.Button.extend(
          {
            elementId: 'autoModeEnable',
            classNames: 'autoModeEnable switcher',
            iconBinding: 'onIconChange',
            disabledBinding: 'parentView.disabled',
            // Change Icon for Frequency Scan
            onIconChange: function() {
              if (SDL.ClimateController.model.climateControlData.autoModeEnable) {
                return 'images/media/active_horiz_led.png';
              } else {
                return 'images/media/passiv_horiz_led.png';
              }
            }.property(
              'SDL.ClimateController.model.climateControlData.autoModeEnable'
            ),
            action: 'toggleAutoModeEnable',
            target: 'SDL.ClimateController.model',
            onDown: false,
            text: 'Auto'
          }
        ),
        dualModeEnable: SDL.Button.extend(
          {
            elementId: 'dualModeEnable',
            classNames: 'dualModeEnable switcher',
            iconBinding: 'onIconChange',
            disabledBinding: 'parentView.disabled',
            // Change Icon for Frequency Scan
            onIconChange: function() {
              if (SDL.ClimateController.model.climateControlData.dualModeEnable) {
                return 'images/media/active_horiz_led.png';
              } else {
                return 'images/media/passiv_horiz_led.png';
              }
            }.property(
              'SDL.ClimateController.model.climateControlData.dualModeEnable'
            ),
            action: 'toggleDualMode',
            target: 'SDL.ClimateController.model',
            onDown: false,
            text: 'Dual'
          }
        ),
        recirculateAirEnable: SDL.Button.extend(
          {
            elementId: 'recirculateAirEnable',
            classNames: 'recirculateAirEnable switcher',
            iconBinding: 'onIconChange',
            disabledBinding: 'parentView.disabled',
            // Change Icon for Frequency Scan
            onIconChange: function() {
              if (SDL.ClimateController.model.climateControlData.circulateAirEnable) {
                return 'images/media/active_horiz_led.png';
              } else {
                return 'images/media/passiv_horiz_led.png';
              }
            }.property(
              'SDL.ClimateController.model.climateControlData.circulateAirEnable'
            ),
            righticon: 'images/climate/recycle_ico.png',
            action: 'toggleRecirculateAir',
            target: 'SDL.ClimateController.model',
            templateName: 'rightIcon',
            onDown: false
          }
        )
      }
    )
  }
);
