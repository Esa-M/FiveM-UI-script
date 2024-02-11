local ProgressBarData = nil

CreateThread(function()
    Wait(1000)
    print("Progress Bar Data")
    local text = GetResourceKvpString('progBarText:string')
    local color = GetResourceKvpString('progBarColor:string')
    SendNUIMessage({
        type = "SetProgressBar",
        text = text,
        color = color
    })
end)

local function StartProgressBar(message, length, params)
    -- Another ProgressBar is active
    if ProgressBarData then
        return false
    end

    ProgressBarData = params

    -- Freeze the Player if requested
    if ProgressBarData.FreezePlayer then
        FreezeEntityPosition(PlayerPedId(), true)
    end

    -- Send meesage to the NUI
    SendNUIMessage({
        type = "StartProgressBar",
        length = length,
        message = message
    })

    ProgressBarData.length = length
    while ProgressBarData ~= nil do
        if ProgressBarData.length > 0 then
            ProgressBarData.length = ProgressBarData.length - 1000
        else
            -- Unfreeze Player
            if ProgressBarData.FreezePlayer then
                FreezeEntityPosition(PlayerPedId(), false)
            end

            -- Invoke the completion callback function if any
            if ProgressBarData.completionCallback then
                ProgressBarData.completionCallback()
            end
            ProgressBarData = nil
        end
        Wait(1000)
    end
end

local function CancelProgressBar()
    -- No progress bar is active
    if ProgressBarData == nil then
        return
    end

    -- Send closing message to NUI
    SendNUIMessage({
        type = "CancelProgressBar"
    })

    -- Unfreeze Player
    if ProgressBarData.FreezePlayer then
        FreezeEntityPosition(PlayerPedId(), false)
    end

    -- Invoke the cancellation callback function if any
    if ProgressBarData.cancellationCallback then
        ProgressBarData.cancellationCallback()
    end

    -- Reset the ProgressBarData
    ProgressBarData = nil
end

RegisterNUICallback("StoreConfigData", function(data, cb)
    SetResourceKvp('progBarText:string', data.selectedData.selectedText)
    SetResourceKvp('progBarColor:string', data.selectedData.selectedColor)

    cb({})
end)

RegisterNUICallback("CloseConfigureMenu", function(data, cb)
    SetNuiFocus(false, false)

    cb({})
end)

RegisterCommand('startProgress', function(source, args, raw)
    local length = args[1]
    local message = args[2]

    local params = {
        FreezePlayer = true
    }

    StartProgressBar(message, tonumber(length), params)
end)

RegisterCommand('configProgressBar', function (source, args, raw)
    SetNuiFocus(true, true)
    SendNUIMessage({
        type = "ConfigureProgressBar"
    })
end)

exports('StartProgressBar', StartProgressBar)
exports('CancelProgressBar', CancelProgressBar)